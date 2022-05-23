import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { AlertController, NavController, Platform, LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Geolocation } from '@capacitor/geolocation';
import { Geolocation } from '@ionic-native/geolocation/ngx';


const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}


@Component({
  selector: 'app-report-incident-new',
  templateUrl: './report-incident-new.page.html',
  styleUrls: ['./report-incident-new.page.scss'],
})
export class ReportIncidentNewPage implements OnInit {

  private file: File;

  // Multiple File Upload
  private fileOne: File;
  private fileTwo: File;
  private fileThree: File;

  images: LocalFile[] = [];

  fileToUpload: File = null;
  cordinates: any;

  Forced_Displacement = "Forced Displacement";
  forced = "false";
  exposure = "false";
  loss = "false";
  cultural = "false";
  torture = "false";
  freedom = "false";
  water = "false";
  labour = "false";
  child = "false";
  violence = "false";
  smuggling = "false";
  murder = "false";
  backButtton = "flase";

  otherOption1 = "false";
  murderOption1 = "false";
  locationName1 = "false";
  locationName2 = "false";

  contactInfo = "false";

  whatTranspired = "false";
  onHome = "false";

  gotoLocation1 = "false";
  backtoLocation1 = "false";
  backtoHome = "false";
  gotowhatTranspired = "false";
  backtowhatTranspired = "false";
  contactInfoBtn = "false";

  victimDiv = "false";
  pepDiv = "false";
  locationDiv = "false";

  gotoVictimBtn = "false";
  backtoVicBtn = "false";
  gotoPepBtn = "false";
  backtoPerp = "false";



  user = {
    name: '',
    amount: 0,
    quantity: 0,
    description: '',
    invoice: null,
    user: JSON.parse(localStorage.getItem('user_id')),
    date: new Date()
  };

  involves_company = 'false';

  backtoHomeFun() {
    this.backtoHome = "false";
    this.gotoLocation1 = "false";
    this.locationName1 = "false";
    this.onHome = "false";
    this.gotoVictimBtn = "false";
    this.locationDiv = "false";
  }

  gotoLocation1Fun() {
    this.gotoLocation1 = "true";
    this.backtoHome = "true";
    this.locationName1 = "false";
    this.gotoVictimBtn = "true";
    this.onHome = "true";
    this.locationDiv = "true";
    // this.gotoLocation1 = "false";
  }

  gotoVictimFun(){
    this.locationName1 = "false";
    this.locationDiv = "false";
    this.victimDiv = "true";
    // this.gotoLocation1 = "false";
    this.gotoVictimBtn = "false";
    this.gotoPepBtn = "true";
    this.backtoHome = "false";
    this.backtoLocation1 = "true";
    this.gotoLocation1 = "true";
    // this.backtoLocation1 = "false";
  }

  backtoVicFun (){
    this.pepDiv = "false";
    this.backtoVicBtn = "false";
    this.backtoLocation1 = "true";
    this.gotoVictimBtn = "false";
    this.victimDiv = "true";
    this.gotoPepBtn = "true";
    this.locationName1 = "false";
  }

  backtoPerpFun() {
    this.contactInfoBtn = "false";
    this.locationName1 = "true";
    this.whatTranspired = "false";
    this.pepDiv = "true";
    this.backtoVicBtn = "true";
    this.backtoPerp = "false";
  }

  gotoPepFun(){
    this.victimDiv = "false";
    this.pepDiv = "true";
    this.backtoVicBtn = "true";
    this.backtoLocation1 = "false";
    this.gotoPepBtn = "false";
    this.locationName1 = "true";
  }

  gotoWhatTrans() {
    this.whatTranspired = "true";
    this.locationName1 = "false";
    this.backtoLocation1 = "false";
    this.backtoHome = "false";
    this.contactInfoBtn = "true";
    this.gotoLocation1 = "true";
    this.backtowhatTranspired = "false";
    this.backtoVicBtn = "false";
    this.backtoPerp = "true";
    this.pepDiv = "false";

  }

  backtowhatTrans() {
    this.contactInfo = "false";
    this.whatTranspired = "true";
    this.backtowhatTranspired = "false";
    this.backtoPerp = "true";
    this.backtoHome = "false";
    this.contactInfoBtn = "true";
  }

  backtoLocation1Fun() {
    this.contactInfoBtn = "false";
    this.contactInfo = "false";
    this.whatTranspired = "false";
    this.backtoLocation1 = "false";
    this.backtoHome = "true";
    this.gotoVictimBtn = "true";
    this.victimDiv = "false";
    this.locationDiv = "true";
    this.gotoLocation1 = "true";
    this.gotoPepBtn = "false";
  }


  gotoContactInfo() {
    this.contactInfo = "true";
    this.whatTranspired = "false";
    this.backtoLocation1 = "false";
    this.contactInfoBtn = "false";
    this.backtowhatTranspired = "true";
    this.backtoPerp = "false";
  }

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

  latitude: any;
  longitude: any;

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private navCtrl: NavController,
    private router: Router,
    private plt: Platform,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation
  ) {
    // this.getCurrentPosition();
    this.getLocation();
  }

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
    reporter_phone: null,
    reporter_address: "",
    reporter_email: "",
    location: "",
    latitude: "",
    longitude: "",
    experiment: {},
    // perpetrator: {}
    // identity_verification: "",
    // evidence_files: ""
  }

  // async getCurrentPosition() {
  //   const coordinates = await Geolocation.getCurrentPosition();
  //   // console.log('Current', coordinates);
  //   this.cordinates = coordinates;
  //   console.log("latitude", this.cordinates.coords.latitude);
  //   console.log("longitude", this.cordinates.coords.longitude);
  //   this.new_case.latitude = this.cordinates.coords.latitude;
  //   this.new_case.longitude = this.cordinates.coords.longitude;
  // }

  async getLocation() {
    console.log('[DEBUG] About to getCurrentPosition()');
    const position = await this.geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log("latitude", this.latitude);
    console.log("longitude", this.longitude);
    this.new_case.latitude = this.latitude;
    this.new_case.longitude = this.longitude;
  }

  // watchPosition() {
  //   const wait = Geolocation.watchPosition({}, (position, err) => { });
  // }


  victim_ = {
    victim_name: '',
    victim_description: '',
    victim_contact: '',
    victim_age: '',
    victim_gender: ''
  }

  company_ = {
    company_name: '',
    location: '',
    description: ''
  }

  perpetrator = {
    description_of_perpetrator: "",
    perpetrator_age: "",
    perpetrator_gender: "",
    perpetrator_name: ""
  }

  victimsArray = [];
  perpetratorArray = [];
  companyArray = [];

  violationType(event) {
    console.log("event", event);
    if (event == "Forced Displacement") {
      this.forced = "true";
    } else {
      this.forced = "false";
    }
    if (event == "Exposure to pollutants") {
      this.exposure = "true";
    } else {
      this.exposure = "false";
    }
    // Loss of land or economic assets
    if (event == "Loss of land or economic assets") {
      this.loss = "true";
    } else {
      this.loss = "false";
    }
    // Desecration of cultural heritage including graves
    if (event == "Desecration of cultural heritage including graves") {
      this.cultural = "true";
    } else {
      this.cultural = "false";
    }
    // Torture, intimidation and harassment
    if (event == "Torture, intimidation and harassment") {
      this.torture = "true";
    } else {
      this.torture = "false";
    }
    // Reduced freedom of movement
    if (event == "Reduced freedom of movement") {
      this.freedom = "true";
    } else {
      this.freedom = "false";
    }
    // Limited access to water
    if (event == "Limited access to water") {
      this.water = "true";
    } else {
      this.water = "false";
    }
    //Forced and unpaid labour
    if (event == "Forced and unpaid labour") {
      this.labour = "true";
    } else {
      this.labour = "false";
    }
    // Child labour
    if (event == "Child labour") {
      this.child = "true";
    } else {
      this.child = "false";
    }
    //Evidence of smuggling 
    if (event == "Evidence of smuggling") {
      this.smuggling = "true";
    } else {
      this.smuggling = "false";
    }
    //Sexual violence
    if (event == "Sexual violence") {
      this.violence = "true";
    } else {
      this.violence = "false";
    }
    // Murder or killings
    if (event == "Murder or killings") {
      this.murder = "true";
    } else {
      this.murder = "false";
    }
  }

  handleCompanyChange() {
    let element = {
      company_name: this.company_.company_name,
      location: this.company_.location,
      description: this.company_.description,
    };
    this.companyArray.push(element);
    console.log("companyArray", this.companyArray);
  }

  handleVictimsChange() {
    let element = {
      victim_name: this.victim_.victim_name,
      victim_contact: this.victim_.victim_contact,
      victim_age: this.victim_.victim_age,
      victim_gender: this.victim_.victim_gender,
      victim_description: this.victim_.victim_description
    };
    this.victimsArray.push(element);
    console.log("victimsArray", this.victimsArray);
  }

  removeVictims(index) {
    this.victimsArray.splice(index, 1);
  }

  handlePerpetratorChange() {
    let element = {
      description_of_perpetrator: this.perpetrator.description_of_perpetrator,
      perpetrator_age: this.perpetrator.perpetrator_age,
      perpetrator_gender: this.perpetrator.perpetrator_gender,
      perpetrator_name: this.perpetrator.perpetrator_name,
    };
    this.perpetratorArray.push(element);
    console.log("perpetratorArray", this.perpetratorArray);
  }

  removePerpetrator(index) {
    this.perpetratorArray.splice(index, 1);
  }

  otherOption(event) {
    if (event == "other") {
      this.otherOption1 = "true";
    } else {
      this.otherOption1 = "false";
    }
  }

  murderOption(event) {
    if (event == "other weapons") {
      this.murderOption1 = "true";
    } else {
      this.murderOption1 = "false";
    }
  }

  // locationName(event){
  //   if(event == "other weapons") {
  //     this.locationName1 = "true";
  //   } else {
  //     this.locationName1 = "false";
  //   }
  // }

  activateLocation() {
    this.locationName1 = "true";
    this.onHome = "true";
  }

  activateLocation2() {
    this.locationName1 = "true";
    this.onHome = "true";
  }

  activateHome() {
    this.locationName1 = "false";
    this.whatTranspired = "false";
    this.onHome = "false";
  }

  activatewhatTranspired() {
    this.locationName1 = "false";
    this.whatTranspired = "true";
    this.locationName2 = "true";
  }


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
      this.new_case.type_of_violation == ""
    ) {
      this.presentAlert1();
    }
    else {
      this.new_case.experiment = {
        "victims": this.victimsArray,
      }
      this.new_case.experiment = {
        "perpetrator": this.perpetratorArray,
      }
      this.new_case.experiment = {
        "company": this.companyArray,
      }

      if (this.latitude != null && this.longitude){
        this.new_case.latitude = this.latitude;
        this.new_case.longitude = this.longitude;
      }
      // const response = await fetch(file.data);
      // const blob = await response.blob();
      // const formData = new FormData();
      // formData.append('invoice', blob, file.name);

      // this.user.invoice = formData.append('invoice', blob, file.name);
      console.log("new_case", this.new_case);
      this.new_case.date_reported = new Date(this.new_case.date_reported);

      this.loading = true;
      this.authService.register('reportcase/report_case/new/', this.new_case).subscribe((res) => {

        console.log(res);
        this.loading = false;
        this.router.navigateByUrl('welcome');
        this.presentAlert5();
      }, (err) => {
        console.log(err);
        this.loading = false;
        if (err.status == "400") {
          this.presentAlert12();
        } else {
          this.presentAlert(err.message);
        }
      });
    }
  }

  presentAlert12() {
    const alert = this.alertController.create({
      header: 'Error!',
      message: 'Please fill in all the required fields',
      subHeader: 'Fill in all fields',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
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
      header: 'Thank you!',
      message: 'You have successfully reported an incident',
      subHeader: 'incident has been reported',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }


  // onFileChange(event) {
  //     this.fileToUpload = event.target.files[0];
  // }




  // New Code
  // Single File Upload
  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }

  async submitForm() {
    let formData = new FormData();
    formData.append('community_description', this.new_case.community_description);
    formData.append('type_of_violation', this.new_case.type_of_violation);
    formData.append('how_it_happened', this.new_case.how_it_happened);
    formData.append('names_of_vitims', this.new_case.names_of_vitims);
    formData.append("evidence_files", this.file, this.file.name);
    formData.append("identity_verification", this.file, this.file.name);

    const serverUrl = "reportcase/report_case/new/";
    const nestServerUrl = "http://localhost:3000/photos/upload";

    this.authService.register(serverUrl, formData).subscribe((response) => {
      console.log(response);
    });
  }

  // Multiple File Upload
  onFileOneChange(fileChangeEvent) {
    this.fileOne = fileChangeEvent.target.files[0];
  }

  onFileTwoChange(fileChangeEvent) {
    this.fileTwo = fileChangeEvent.target.files[0];
  }

  onFileThreeChange(fileChangeEvent) {
    this.fileThree = fileChangeEvent.target.files[0];
  }

  async submitMultipleForm() {
    let formData = new FormData();
    formData.append("photos[]", this.fileOne, this.fileOne.name);
    formData.append("photos[]", this.fileTwo, this.fileTwo.name);
    formData.append("photos[]", this.fileThree, this.fileOne.name);

    const serverUrl = "reportcase/report_case/new/";
    const nestServerUrl = "http://localhost:3000/photos/uploads";

    this.authService.register(serverUrl, formData).subscribe((response) => {
      console.log(response);
    });
  }

}
