import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  data: any;
  constructor(private barcodeScanner: BarcodeScanner, private alertController: AlertController) {}

  async scan() {
    this.barcodeScanner.scan().then(async barcodeData => {
      const alert = await this.alertController.create({
        header: 'Barcode',
        subHeader: barcodeData.format,
        message: barcodeData.text,
        buttons: ['OK'],
      });
  
      await alert.present();
    }).catch(async err => {

      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Barcode scanning error',
        message: err,
        buttons: ['OK'],
      });
  
      await alert.present();
    });
  }
}
