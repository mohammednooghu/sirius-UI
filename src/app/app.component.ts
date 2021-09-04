import { Component,OnInit,ViewChild } from '@angular/core';
import{DatePipe} from'@angular/common/'
import{HttpClient} from '@angular/common/http'
import { FormBuilder, FormGroup, Validators,FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
 countdownTimer=""
 weatherresult=[]
 destinationresult=[]
 registerForm: FormGroup;
 submitted = false;
 @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(public http:HttpClient,private formBuilder: FormBuilder){
    setInterval(() => { this.countdown(); }, 1000)
  }
  ngOnInit(){
this.weatherAPI()
this.destinationAPI()

this.registerForm = this.formBuilder.group({
  Name: ['', Validators.required],
  contact: ['', [Validators.required,Validators.maxLength(10)]],
  email: ['', [Validators.required, Validators.email]],
 
});
  }
  countdown(){
    var countDownDate = new Date("Sep 10, 2021 16:37:52").getTime()
    var now = new Date().getTime();
    var timeleft = countDownDate - now;
        
 
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    this.countdownTimer=days+"d "+hours+"h "+minutes+"m "+seconds+"s"
  }
  weatherAPI(){
let weatherDetails=this.http.get('https://run.mocky.io/v3/e3ae9d2e-78f5-403d-b6cd-fa7f8c7e1576')
weatherDetails.subscribe(response=>{
this.weatherresult= response["result"]
})
  }
destinationAPI(){
  let destinationDetails=this.http.get('https://run.mocky.io/v3/3e6901dd-9a60-4771-a8cb-9c62177a654c')
  destinationDetails.subscribe(response=>{
this.destinationresult= response["result"]
})
}

onSubmit() {
 
  this.submitted = true;

  if (this.registerForm.invalid) {
      return;
  }
 
  this.registerForm.reset()
  Object.keys(this.registerForm.controls).forEach(key => {
    this.registerForm.get(key).setErrors(null) ;
  });
 
}
scroll(el: HTMLElement) {
  el.scrollIntoView();
}
}
