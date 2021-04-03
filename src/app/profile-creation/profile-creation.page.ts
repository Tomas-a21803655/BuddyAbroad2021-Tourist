import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FireStorageService} from '../fire-storage.service';
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {finalize, tap} from 'rxjs/operators';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.page.html',
  styleUrls: ['./profile-creation.page.scss'],
})
export class ProfileCreationPage implements OnInit {

  public user;

  // Upload Task
  task: AngularFireUploadTask;

  // Progress in percentage
  percentage: Observable<number>;

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;

  // Uploaded Image List
  images: Observable<MyData[]>;

  // File details
  fileName: string;
  fileSize: number;

  // Status check
  isUploading: boolean;
  isUploaded: boolean;

  public validationsForm: FormGroup;

  private imageCollection: AngularFirestoreCollection<MyData>;

  public imageFilePath;

  constructor(private router: Router, private navCtrl: NavController, private formBuilder: FormBuilder,
              public fireStorageService: FireStorageService, private route: ActivatedRoute,
              public afs: AngularFirestore, private afStorage: AngularFireStorage
  ) {
    this.isUploading = false;
    this.isUploaded = false;

    // Set collection where our documents/ images info will save
    this.imageCollection = afs.collection<MyData>('TripImages');
    this.images = this.imageCollection.valueChanges();
  }

  ngOnInit() {
    const recievedUser = this.route.snapshot.paramMap.get('user');
    const userArr = recievedUser.split('&');
    this.user = {
      name: userArr[0],
      description: userArr[1],
      home: userArr[2],
      languages: userArr[3],
    }

    this.validationsForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required
      ])),
      home: new FormControl('', Validators.compose([
        Validators.required
      ])),
      languages: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  async onSubmit(value) {
    // Noodle code deadline Refactor depois
    let nameToSet = value.name;
    if (nameToSet === '') {
      nameToSet = this.user.name;
    }

    let descriptionToSet = value.description;
    if (descriptionToSet === '') {
      descriptionToSet = this.user.description;
    }

    let homeToSet = value.home;
    if (homeToSet === '') {
      homeToSet = this.user.home;
    }

    let languageToSet = value.languages;
    if (languageToSet === '') {
      languageToSet = this.user.languages;
    }

    let profile;
    if (!this.isUploading && !this.isUploaded) {
      profile = {
        // rating: this.user.rating,
        home: homeToSet,
        name: nameToSet,
        description: descriptionToSet,
        languages: languageToSet,
      };
    } else {
      profile = {
        image: this.imageFilePath,
        // rating: this.user.rating,
        home: homeToSet,
        name: nameToSet,
        description: descriptionToSet,
        languages: languageToSet,
      };
    }
    await this.fireStorageService.createProfile(profile).then(
        () => {
          this.isUploading = this.isUploaded = false
          this.router.navigate(['/tabs/profile']);
        }
    );

  }

  resetFields() {
    this.isUploading = this.isUploaded = false
    this.validationsForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      home: new FormControl('', Validators.required),
      languages: new FormControl('', Validators.required),
    });
  }

  goback() {
    this.navCtrl.pop();
  }

  // here

  uploadFile(event: FileList) {


    // The File object
    const file = event.item(0)

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    this.isUploading = true;
    this.isUploaded = false;


    this.fileName = file.name;

    // The storage path
    const path = `tripImages/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = {app: 'created trip images'};

    // File reference
    const fileRef = this.afStorage.ref(path);

    // The main task
    this.task = this.afStorage.upload(path, file, {customMetadata});

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
        finalize(() => {
          // Get uploaded file storage path
          this.UploadedFileURL = fileRef.getDownloadURL();

          this.UploadedFileURL.subscribe(resp => {
            this.addImagetoDB({
              name: file.name,
              filepath: resp,
              size: this.fileSize
            });
            this.isUploading = false;
            this.isUploaded = true;
          }, error => {
            console.error(error);
          })
        }),
        tap(snap => {
          this.fileSize = snap.totalBytes;
        })
    )
  }

  addImagetoDB(image: MyData) {
    // Create an ID for document
    const id = this.afs.createId();
    this.imageFilePath = image.filepath;
    // Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log('error ' + error);
    });
  }

}
