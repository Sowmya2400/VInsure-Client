import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CalcPremiumComponent } from './MyComponents/calc-premium/calc-premium.component';
import { RegisterComponent } from './MyComponents/register/register.component';
import { DashboardComponent } from './MyComponents/dashboard/dashboard.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { AboutUsComponent } from './MyComponents/about-us/about-us.component';
import { FaqComponent } from './MyComponents/faq/faq.component';
import { HelpComponent } from './MyComponents/help/help.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { ComparePlansComponent } from './MyComponents/compare-plans/compare-plans.component';
import { AdminLoginComponent } from './MyComponents/admin-login/admin-login.component';
import { AdminDashboardComponent } from './MyComponents/admin-dashboard/admin-dashboard.component';
import { BuyVehicleInsuranceComponent } from './MyComponents/buy-vehicle-insurance/buy-vehicle-insurance.component';
import { BuyTravelInsuranceComponent } from './MyComponents/buy-travel-insurance/buy-travel-insurance.component';
import { BuyInsuranceComponent } from './MyComponents/buy-insurance/buy-insurance.component';
import { HeaderComponent } from './MyComponents/header/header.component';
import { EventListenerComponent } from './MyComponents/event-listener/event-listener.component';
import { MyInsuranceComponent } from './MyComponents/my-insurance/my-insurance.component';
import { OptionsComponent } from './MyComponents/options/options.component';
import { CalPreTwoWheelerComponent } from './MyComponents/cal-pre-two-wheeler/cal-pre-two-wheeler.component';
import { CalPreFourWheelerComponent } from './MyComponents/cal-pre-four-wheeler/cal-pre-four-wheeler.component';
import { ViewPlansComponent } from './MyComponents/view-plans/view-plans.component';
import { ViewPlansTravelComponent } from './MyComponents/view-plans-travel/view-plans-travel.component';
import { AllPlansComponent } from './MyComponents/all-plans/all-plans.component';
import { ClaimComponent } from './MyComponents/claim/claim.component';
import { ClaimFormComponent } from './MyComponents/claim-form/claim-form.component';
import { ClaimPolicyNumberComponent } from './MyComponents/claim-policy-number/claim-policy-number.component';
import { ClaimSubmittedComponent } from './MyComponents/claim-submitted/claim-submitted.component';
import { PaymentComponent } from './MyComponents/payment/payment.component';
import { PaymentSuccessfulComponent } from './MyComponents/payment-successful/payment-successful.component';
import { RenewPaymentComponent } from './MyComponents/renew-payment/renew-payment.component';
import { RenewNotexpiredComponent } from './MyComponents/renew-notexpired/renew-notexpired.component';
import { CustomerListComponent } from './MyComponents/customer-list/customer-list.component';
import { ClaimListComponent } from './MyComponents/claim-list/claim-list.component';
import { AdminOptionsComponent } from './MyComponents/admin-options/admin-options.component';
import { VehicleInsuranceTypeComponent } from './MyComponents/vehicle-insurance-type/vehicle-insurance-type.component';
import { VehicleTypeComponent } from './MyComponents/vehicle-type/vehicle-type.component';
import { VehicleInfoFormComponent } from './MyComponents/vehicle-info-form/vehicle-info-form.component';
import { TravelTypeComponent } from './MyComponents/travel-type/travel-type.component';
import { TravelFormComponent } from './MyComponents/travel-form/travel-form.component';
import { ForgotPasswordComponent } from './MyComponents/forgot-password/forgot-password.component';
import { TermsandconditionsComponent } from './MyComponents/termsandconditions/termsandconditions.component';
import { FooterComponent } from './MyComponents/footer/footer.component';
import { ViewFileComponent } from './MyComponents/view-file/view-file.component';


@NgModule({
  declarations: [
    AppComponent,
    CalcPremiumComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    AboutUsComponent,
    FaqComponent,
    HelpComponent,
    HomeComponent,
    ComparePlansComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    BuyInsuranceComponent,
    BuyVehicleInsuranceComponent,
    BuyTravelInsuranceComponent,
    BuyInsuranceComponent,
    BuyInsuranceComponent,
    HeaderComponent,
    EventListenerComponent,
    BuyInsuranceComponent,
    MyInsuranceComponent,
    OptionsComponent,
    CalPreTwoWheelerComponent,
    CalPreFourWheelerComponent,
    ViewPlansComponent,
    ViewPlansTravelComponent,
    AllPlansComponent,
    ClaimComponent,
    ClaimFormComponent,
    ClaimPolicyNumberComponent,
    ClaimSubmittedComponent,
    PaymentComponent,
    PaymentSuccessfulComponent,
    RenewPaymentComponent,
    RenewNotexpiredComponent,
    CustomerListComponent,
    ClaimListComponent,
    AdminOptionsComponent,
    VehicleInsuranceTypeComponent,
    VehicleTypeComponent,
    VehicleInfoFormComponent,
    TravelTypeComponent,
    TravelFormComponent,
    ForgotPasswordComponent,
    TermsandconditionsComponent,
    FooterComponent,
    ViewFileComponent

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
