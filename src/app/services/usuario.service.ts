import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RegisterForm} from "../interfaces/register-form.interface";
import {loginForm} from "../interfaces/login-form.interfaces";
import {catchError, map, tap} from "rxjs/operators";
// @ts-ignore
import Any = jasmine.Any;
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2:any;
  private gapi: any;





  constructor(private http:HttpClient,
              private router:Router,
              private ngZone:NgZone) {
    this.googleInit();
  }

 googleInit(){

    return new Promise( resolve => {
   this.gapi.load('auth2',  ()=> {
     let gapi;
     this.auth2 = gapi.auth2.init({
       client_id: '222669521703-m8v8komjrtj64m5fdffn8a17ltcmvndp.apps.googleusercontent.com ',
       cookiepolicy: 'single_host_origin',
    });
      resolve();
     });
   });
 }

  logout(){
    localStorage.removeItem('token');

  this.auth2.signOut().then( ()=> {

    this.ngZone.run(()=>{
    this.router.navigateByUrl('/login');
    })
    });

  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap( (resp:any)=>{
        localStorage.setItem('token',resp.token)
      }),
      map( resp => true),
      catchError( error =>of(false))
    );

  }

  crearUsuario( formData : RegisterForm){

    return this.http.post(`${base_url}/usuarios`,formData);
  }

  login( formData : loginForm){

    return this.http.post(`${base_url}/login`,formData)
      .pipe(
        tap( (resp:any)=>{
         localStorage.setItem('token',resp.token)
        }),
        map( resp => true)
      );
  }


  loginGoogle(token) {

    return this.http.post(`${ base_url}/login/google`,{token})
      .pipe(
        tap((resp:Any)=>{
          localStorage.setItem('token',resp.token)
        })
      )

  }
}
