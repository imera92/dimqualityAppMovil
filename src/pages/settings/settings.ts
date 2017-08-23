import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams , AlertController} from 'ionic-angular';

import { Settings } from '../../providers/settings';
import { LocalUser } from '../../providers/localUser';
import { LoginPage } from '../login/login';

import { TranslateService } from '@ngx-translate/core';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public localUser: LocalUser,
    public formBuilder: FormBuilder,
    public navParams: NavParams,    
    public alertCtrl: AlertController,
    public translate: TranslateService) {
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: 'Cerrar Sesion',
      message: '¿Desea cerrar la sesion?',
      buttons: [      
      {
        text: 'SI',
        handler: () => {
          this.localUser.setUser(null);
          window.location.reload();
        }
      },
      {
        text: 'NO',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
    alert.present();
  }
}
