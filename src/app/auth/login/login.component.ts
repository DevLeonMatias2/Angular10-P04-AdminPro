import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import Swal from 'sweetalert2'


declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });
  private Swal: any;
  private auth2: any;


  constructor(private router: Router,
              private fb: FormBuilder,
              private  usuarioService: UsuarioService,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    console.log(this.loginForm.value);
    this.usuarioService.login(this.loginForm.value).subscribe(resp => {
      console.log(resp);

      if (this.loginForm.get('remenber').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }
      // Navegar al Dashboard
      this.router.navigateByUrl('/');

    }, (err) => {
      this.Swal.fire('Error', err.error.msg, 'error');
    });

    // console.log(this.loginForm.value)
    // this.router.navigateByUrl('/');

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }

  startApp() {
    gapi.load('auth2', function () {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '222669521703-m8v8komjrtj64m5fdffn8a17ltcmvndp.apps.googleusercontent.com ',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this.usuarioService.loginGoogle(id_token)
          .subscribe(resp => {
            // Navegar al Dashboard
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            })
          });

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}
