import { Pipe, PipeTransform } from '@angular/core';
import { urlApi } from '@/config';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  transform(image: string, type: string = 'user'): Observable<SafeUrl> {
    let url = urlApi + '/image';
    if (!image) {
      url += '/user/none';
    } else {
      switch (type) {
        case 'user':
          url += '/user/' + image;
          break;
        case 'formats':
          url += '/formats/' + image;
          break;
      }
    }

    return this.http
      .get(url, { responseType: 'blob' })
      .map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)));
  }

}
