import { Component, Input, OnChanges } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

export interface Image {
    path: string;
    filename: string;
    downloadURL?: string;
    $key?: string;
}

@Component({
    selector: 'sffb-uploader',
    templateUrl: './uploader.component.html',
})
export class UploaderComponent implements OnChanges {
    /**
     * The name of the folder for images
     * eg. posts/angular-is-awesome
     */
    @Input() folder: string;
    @Input() maxAge = 604800;

    fileList: AngularFireList<Image>;
    imageList: Observable<Image[]>;

    constructor(public db: AngularFireDatabase) {}

    ngOnChanges() {
        console.log('new values for folder');
        const storage = firebase.storage();

        this.fileList = this.db.list<Image>(`/${this.folder}/images`);
        console.log('Rendering all images in ', `/${this.folder}/images`);

        this.imageList = this.fileList.snapshotChanges().pipe(
            map(itemSnapshotList =>
                itemSnapshotList.map(item => {
                    const image = item.payload.val();
                    console.log(item, 'is in our list of images.');
                    const pathReference = storage.ref(image.path);
                    const result = { $key: item.key, path: image.path, downloadURL: null, filename: image.filename };
                    // This Promise must be wrapped in Promise.resolve because the thennable from
                    // firebase isn't monkeypatched by zones and therefore doesn't trigger CD
                    result.downloadURL = Promise.resolve(pathReference.getDownloadURL());

                    return result;
                })
            )
        );
    }

    upload() {
        // Create a root reference
        const storageRef = firebase.storage().ref();
        const inputBox = <HTMLInputElement>document.getElementById('file');
        if (inputBox.files.length <= 0) {
            console.log('No files found to upload.');
            return;
        }


        // This currently only grabs item 0, TODO refactor it to grab them all
        for (const selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
            console.log('Attempting to upload', selectedFile);
            // Make local copies of services because "this" will be clobbered
            const folder = this.folder;
            const path = `/${this.folder}/${selectedFile.name}`;
            const iRef = storageRef.child(path);
            const db = this.db;
            // cache files for up to a week
            iRef
                .put(selectedFile, { cacheControl: 'max-age=' + this.maxAge })
                .then(snapshot => {
                    console.log('Uploaded a blob or file! Now storing the reference at', `/${this.folder}/images/`);
                    db.list(`/${folder}/images/`).push({ path: path, filename: selectedFile.name });
                    inputBox.value = null;
                })
                .catch(err => {
                    console.error('Unable to upload file', err);
                });
        }
    }

    delete(image: Image) {
        const storagePath = image.path;
        console.log('deleting image with data', image);
        const referencePath = `${this.folder}/images/` + image.$key;

        // Do these as two separate steps so you can still try delete ref if file no longer exists

        // Delete from Storage
        firebase
            .storage()
            .ref()
            .child(storagePath)
            .delete()
            .then(() => {
                console.log('File deleted from storage successfully');
            })
            .catch(error => {
                console.error('Error deleting stored file', storagePath);
            });

        // Delete references
        console.log('Deleting reference from', referencePath);
        this.db
            .object(referencePath)
            .remove()
            .then(() => 'File reference deleted successfully from the database')
            .catch(err => {
                console.error('File reference was not deleted successfully from the database', err);
            });
    }
}
