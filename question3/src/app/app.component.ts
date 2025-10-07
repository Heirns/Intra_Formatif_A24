import { Component, numberAttribute } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, FormGroup, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Data } from '@angular/router';


@Component({
    selector: 'app-root',
    
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AppComponent {
  title = 'reactive.form';
  formGroup: FormGroup;
  

  constructor(private formBuilder: FormBuilder) 
  { 
    this.formGroup = this.formBuilder.group(
      {
        nom: ['', [Validators.required]],
        roadnumber:['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
        postal:['', [Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")]]
      },
    );
  }

  comment(): ValidatorFn{
return (control: AbstractControl): ValidationErrors | null => {
    const comment = control.value;
    
    // On regarde si le champ est rempli avant de faire la validation
    if (!comment) {
      // On attend que le champ soit rempli avant de le valider
      return null;
    }
    // On fait notre validation. Includes retourne un booléen.
    const estValide = comment.includes('@gmail.com');

    // On retourne null si c'est valide, ou un objet décrivant l'erreur sinon
    return estValide ? null : { estGmail: true };
  };
  }

}
