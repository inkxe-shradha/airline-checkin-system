import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';
import { appReducer } from 'src/app/store';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot(appReducer), FormsModule],
      providers: [{
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [{
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '25860778518-lt39cmgjc3s1na7pfc564gdn2bilqljq.apps.googleusercontent.com'
            )
          }]
        } as SocialAuthServiceConfig,
      }, SocialAuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should be present the Login button in the component", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("button").textContent).toContain("Login");
  })

  it("Should be present the google authentication button in the component", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p").children[0].textContent).toContain("Sign in with google");
  })

  it("Input should be initially to be empty!", () => {
    const compiled = fixture.debugElement.nativeElement;
    const emailField = compiled.querySelector("#email");
    const passwordField = compiled.querySelector("#password");
    expect(emailField.value).toBe("");
    expect(passwordField.value).toBe("");
  })

  it("Should be able to type an Email address", () => {
    const compiled = fixture.debugElement.nativeElement;
    const emailField = compiled.querySelector("#email");
    emailField.value = "shradhdhasuman@@gmail.com";
    emailField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(emailField.value).toBe("shradhdhasuman@@gmail.com");
  })

  it("Should be able to type the password", () => {
    const compiled = fixture.debugElement.nativeElement;
    const passwordField = compiled.querySelector("#password");
    passwordField.value = "12345678";
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(passwordField.value).toBe("12345678");
  })

  it("Should be invalid when the form is empty", () => {
    const compiled = fixture.debugElement.nativeElement;
    const emailField = compiled.querySelector("#email");
    const passwordField = compiled.querySelector("#password");
    expect(emailField.value).toBe("");
    expect(passwordField.value).toBe("");
    expect(component.signInForm.valid).toBeTrue();
  })

  it("Should be shown invalid email field when it is blank", async () => {
    fixture.whenStable().then(() => {

      const compiled = fixture.debugElement.nativeElement;
      const emailField = compiled.querySelector("#email");
      emailField.value = "";
      emailField.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(emailField.value).toBe("");
      expect(component.signInForm.form.controls['email'].valid).toBeFalsy();
    })
  })

  it("Should be shown valid email when the valid email field is set", async () => {
    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.nativeElement;
      const emailField = compiled.querySelector("#email");
      emailField.value = "shradhasuman2@gmail.com"
      emailField.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(emailField.value).toBe("shradhasuman2@gmail.com");
      expect(component.signInForm.form.controls['email'].valid).toBeTruthy();
    });
  })

  it("Should be shown invalid password field when it is blank", async () => {
    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.nativeElement;
      const passwordField = compiled.querySelector("#password");
      passwordField.value = "";
      passwordField.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(passwordField.value).toBe("");
      expect(component.signInForm.form.controls['password'].valid).toBeFalsy();
    })
  })

  it("Should be shown valid password when the valid password field is set", async () => {
    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.nativeElement;
      const passwordField = compiled.querySelector("#password");
      passwordField.value = "12345678";
      passwordField.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(passwordField.value).toBe("12345678");
      expect(component.signInForm.form.controls['password'].valid).toBeTruthy();
    })
  });

  it("Should be able to submit the forms", async () => {
    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.nativeElement;
      const emailField = compiled.querySelector("#email");
      const passwordField = compiled.querySelector("#password");
      emailField.value = "admin@gamail.com";
      passwordField.value = "12345678";
      emailField.dispatchEvent(new Event('input'));
      passwordField.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.signInForm.valid).toBeTruthy();
    })
  })
});
