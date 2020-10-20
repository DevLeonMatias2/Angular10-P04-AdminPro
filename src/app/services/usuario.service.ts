import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RegisterForm} from "../interfaces/register-form.interface";
import {loginForm} from "../interfaces/login-form.interfaces";
import {catchError, map, tap} from "rxjs/operators";
// @ts-ignore
import Any = jasmine.Any;
import {Observable, of} from "rxjs";
import {error} from "@angular/compiler/src/util";


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient ) {}


  logout(){
    localStorage.removeItem('token');
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
