import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  closureForm;
  fileToUpload: File = null;
  fileToUpload1: File = null;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    this.closureForm = this.formBuilder.group({
      identity_verification: '',
      evidence_files: '',
    });
  }

  ngOnInit() {
  }

  saveClosureRawMaterials(form: FormBuilder) {
    this.loading = true;
    const uploadData = new FormData();

    uploadData.append('identity_verification', this.closureForm.get('identity_verification').value);
    uploadData.append('evidence_files', this.closureForm.get('evidence_files').value);
    // victim_gender
    uploadData.append('victim_gender', 'Male');

    if (this.fileToUpload) {
      uploadData.append('evidence_files', this.fileToUpload, this.fileToUpload.name);
    }
    if (this.fileToUpload == null) {
      // this.toastr.error('Error', 'Please attach a file.');
      this.loading = false;
    }

    if (this.fileToUpload1) {
      uploadData.append('identity_verification', this.fileToUpload1, this.fileToUpload1.name);
    }
    if (this.fileToUpload1 == null) {
      // this.toastr.error('Error', 'Please attach a file.');
      this.loading = false;
    }

    this.apiService.portPostData3('reportcase/report_case/new/', uploadData).subscribe(
      (data) => {
        this.loading = false;
        // this.toastr.success('Success', 'Quality analysis saved successfully');
      },
      (err) => {
        this.loading = false;
        // this.toastr.error('Error', 'Please fill up all the fields');
      }
    );
  }

  onFileChange(event) {
    this.fileToUpload = event.target.files[0];
  }

  onFileChange1(event) {
    this.fileToUpload1 = event.target.files[0];
  }

}
