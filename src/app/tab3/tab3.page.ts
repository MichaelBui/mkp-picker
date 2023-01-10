import { Component } from '@angular/core';
// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  count: number = 0;
  startTime: number = 0;

  constructor(private alertController: AlertController, private toastController: ToastController) {}

  async scan() {
    this.count = 0;
    this.startTime = (new Date()).getTime();

    BarcodeScanner.hideBackground();
    const body = document.querySelector('body');
    if (body) body.classList.add('scanner-active');

    await this._scan();
  };

  async _scan() {
    await BarcodeScanner.checkPermission({ force: true });
    
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      this.count++;

      const scanningTime = (new Date()).getTime() - this.startTime;
      const averageTime = Math.round(scanningTime / this.count);      
      const message = 'Code: ' + result.content + '. Speed: ' + averageTime + 'ms/code (' + scanningTime + '/' + this.count + ')';
      const toast = await this.toastController.create({
        message: message,
        position: 'bottom'
      });
      await toast.present();
      this._scan();
    }
  }
}
