import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Ubigeos} from './app.ubigeos.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  public reader: FileReader = new FileReader();
  public arrayDep = [];
  public arrayPro = [];
  public arrayDist = [];

  ngOnInit() {

    this.reader.onload = (ev: any) => {
      console.log(ev.target.result);
      const content = ev.target.result;
      const lines = content.split('\n');
      const hashDep = [];
      const hashPro = [];
      const hashDist = [];
      this.arrayDep = [];
      this.arrayPro = [];
      this.arrayDist = [];

      lines
        .filter((l) => l !== '')
        .forEach((l) => {
          const lineArray = l
            .replace(/"/g, '')
            .trim().split('/')
            .filter((i) => i !== '');

          if (hashDep.indexOf(lineArray[0]) === -1) {
            hashDep[lineArray[0]] = ''
          }
          if (typeof lineArray[1] !== 'undefined' && hashPro.indexOf(lineArray[1]) === -1 && lineArray[1].trim() !== '') {
            hashPro[lineArray[1]] = lineArray[0];
          }

          if (typeof lineArray[2] !== 'undefined' && hashDist.indexOf(lineArray[2]) === -1 && lineArray[2].trim() !== '') {
            hashDist[lineArray[2]] = lineArray[1];
          }

        });

      Object.keys(hashDep).forEach((k) => {
        this.arrayDep.push(new Ubigeos(k, hashDep[k]))
      });
      Object.keys(hashPro).forEach((k) => {
        this.arrayPro.push(new Ubigeos(k, hashPro[k]))
      });
      Object.keys(hashDist).forEach((k) => {
        this.arrayDist.push(new Ubigeos(k, hashDist[k]))
      });

    };
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      this.reader.readAsText(fileItem._file);
    };
  }
}
