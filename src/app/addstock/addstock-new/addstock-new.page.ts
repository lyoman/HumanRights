import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { AlertController, NavController, Platform, LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';


const IMAGE_DIR = 'stored-images';

interface LocalFile {
    name: string;
    path: string;
    data: string;
}

@Component({
    selector: 'app-addstock-new',
    templateUrl: './addstock-new.page.html',
    styleUrls: ['./addstock-new.page.scss'],
})
export class AddstockNewPage implements OnInit {

    images: LocalFile[] = [];

    fileToUpload: File = null;

    user = {
        name: '',
        amount: 0,
        quantity: 0,
        description: '',
        invoice: null,
        user: JSON.parse(localStorage.getItem('user_id')),
        date: new Date()
    };

    new_case = {
        user: JSON.parse(localStorage.getItem('user_id')),
        company: "",
        date_reported: new Date(),
        type_of_violation: "",
        description_of_victims: "",
        names_of_vitims: "",
        victim_age: "",
        victim_gender: "",
        describe_gender: "",
        victim_phone_number: "",
        victim_address: "",
        description_of_perpetrator: "",
        motivations_behind_incident: "",
        what_happened: "",
        how_it_happened: "",
        community_description: "",
        reporter_phone: 0,
        reporter_address: "",
        reporter_email: "",
        location: "",
        latitude: 0,
        longitude: 0,
        // identity_verification: "",
        // evidence_files: ""
    }

    involves_company = 'false';

    ivCompany(states) {
        // console.log("status leo man");
        console.log("status", states);
        if (states == "Mining company security guards") {
            this.involves_company = "true";
        } else {
            this.involves_company = "false";
        }
    }

    company = {
        user: JSON.parse(localStorage.getItem('user_id')),
        owners: "",
        when_it_started_operating: 0,
        description: "",
        name: "",
        location: ""
    }

    loading: any;

    constructor(
        private alertController: AlertController,
        private authService: AuthService,
        private navCtrl: NavController,
        private router: Router,
        private plt: Platform,
        private platform: Platform,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController
    ) { }

    // ngOnInit() {
    // }

    involve_Com(res) {
        this.involves_company = res;
    }

    async ngOnInit() {
        // this.loadFiles();
    }

    async loadFiles() {
        this.images = [];

        // const loading = await this.loadingCtrl.create({
        //     message: 'Loading data...',
        // });
        // await loading.present();

        Filesystem.readdir({
            directory: Directory.Data,
            path: IMAGE_DIR
        }).then(result => {
            this.loadFileData(result.files);
        }, async err => {
            await Filesystem.mkdir({
                directory: Directory.Data,
                path: IMAGE_DIR
            });
        }).then(_ => {
            // loading.dismiss();
        })
    }

    async loadFileData(fileNames: string[]) {
        for (let f of fileNames) {
            const filePath = `${IMAGE_DIR}/${f}`;

            const readFile = await Filesystem.readFile({
                directory: Directory.Data,
                path: filePath
            });

            this.images.push({
                name: f,
                path: filePath,
                data: `data:image/jpeg;base64,${readFile.data}`
            });
        }
    }

    async selectImage() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera
        });
        console.log(image);

        if (image) {
            this.saveImage(image);
        }
    }

    async saveImage(photo: Photo) {
        const base64Data = await this.readAsBase64(photo);
        console.log(base64Data);

        const fileName = new Date().getTime() + '.jpeg';
        const savedFile = await Filesystem.writeFile({
            directory: Directory.Data,
            path: `${IMAGE_DIR}/${fileName}`,
            data: base64Data
        });

        this.loadFiles();
    }

    async readAsBase64(photo: Photo) {
        if (this.platform.is('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path
            });

            return file.data;
        }
        else {
            const response = await fetch(photo.webPath);
            const blob = await response.blob();
            return await this.convertBlobToBase64(blob) as string;
        }
    }

    // Helper function
    convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    async startUpload(file: LocalFile) {
        const response = await fetch(file.data);
        console.log("response", response);
        console.log("file", file);
        
        const blob = await response.blob();
        console.log("blob", blob);
        const formData = new FormData();
        formData.append('community_description', this.new_case.community_description);
        formData.append('type_of_violation', this.new_case.type_of_violation);
        formData.append('how_it_happened', this.new_case.how_it_happened);
        formData.append('names_of_vitims', this.new_case.names_of_vitims);
        formData.append('evidence_files', blob, file.name);
        formData.append('identity_verification', blob, file.name);
        this.uploadData(formData);
    }

    async uploadData(formData: FormData) {
        const loading = await this.loadingCtrl.create({
            message: 'Uploading image...',
        });
        await loading.present();

        // Use your own API!
        const url = 'reportcase/report_case/new/';

        this.authService.register(url, formData).pipe(
            finalize(() => {
                loading.dismiss();
            })
        ).subscribe(res => {
            console.log(res);
        })
    }

    async deleteImage(file: LocalFile) {
        await Filesystem.deleteFile({
            directory: Directory.Data,
            path: file.path
        });
        this.loadFiles();
    }


    async register() {
        if (
            this.new_case.type_of_violation == "" ||
            this.new_case.names_of_vitims == "" ||
            this.new_case.what_happened == ""
        ) {
            this.presentAlert1();
        }
        else {

            // const response = await fetch(file.data);
            // const blob = await response.blob();
            // const formData = new FormData();
            // formData.append('invoice', blob, file.name);

            // this.user.invoice = formData.append('invoice', blob, file.name);

            this.loading = true;
            this.authService.register('reportcase/report_case/new/', this.new_case).subscribe((res) => {

                console.log(res);
                this.loading = false;
                this.router.navigateByUrl('addstock');
                this.presentAlert5();
            }, (err) => {
                console.log(err);
                this.loading = false;
                this.presentAlert(err.message);
            });
        }
    }

    presentAlert(err) {
        const alert = this.alertController.create({
            header: 'Authentication Error!',
            message: err,
            subHeader: 'Failed to Add report',
            buttons: ['Dismiss']
        }).then(alert => alert.present());
    }

    presentAlert1() {
        const alert = this.alertController.create({
            header: 'Error!',
            message: 'Please fill in all fields in order to submit report',
            subHeader: 'Fill in all fields',
            buttons: ['Dismiss']
        }).then(alert => alert.present());
    }

    presentAlert5() {
        const alert = this.alertController.create({
            header: 'Success!',
            message: 'You have successfully added your stock',
            subHeader: 'stocks has been added',
            buttons: ['Dismiss']
        }).then(alert => alert.present());
    }


    onFileChange(event) {
        this.fileToUpload = event.target.files[0];
    }

}
