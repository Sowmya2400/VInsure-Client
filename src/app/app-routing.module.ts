import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './MyComponents/about-us/about-us.component';
import { AdminDashboardComponent } from './MyComponents/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './MyComponents/admin-login/admin-login.component';
import { BuyInsuranceComponent } from './MyComponents/buy-insurance/buy-insurance.component';
import { BuyTravelInsuranceComponent } from './MyComponents/buy-travel-insurance/buy-travel-insurance.component';
import { BuyVehicleInsuranceComponent } from './MyComponents/buy-vehicle-insurance/buy-vehicle-insurance.component';
import { CalPreFourWheelerComponent } from './MyComponents/cal-pre-four-wheeler/cal-pre-four-wheeler.component';
import { CalPreTwoWheelerComponent } from './MyComponents/cal-pre-two-wheeler/cal-pre-two-wheeler.component';
import { CalcPremiumComponent } from './MyComponents/calc-premium/calc-premium.component';
import { ComparePlansComponent } from './MyComponents/compare-plans/compare-plans.component';
import { DashboardComponent } from './MyComponents/dashboard/dashboard.component';
import { HelpComponent } from './MyComponents/help/help.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { MyInsuranceComponent } from './MyComponents/my-insurance/my-insurance.component';
import { OptionsComponent } from './MyComponents/options/options.component';
import { RegisterComponent } from './MyComponents/register/register.component';
import { ViewPlansComponent } from './MyComponents/view-plans/view-plans.component';
import { ViewPlansTravelComponent } from './MyComponents/view-plans-travel/view-plans-travel.component';
import { AllPlansComponent } from './MyComponents/all-plans/all-plans.component';
import { ClaimComponent } from './MyComponents/claim/claim.component';
import { ClaimFormComponent } from './MyComponents/claim-form/claim-form.component';
import { ClaimSubmittedComponent } from './MyComponents/claim-submitted/claim-submitted.component';
import { PaymentComponent } from './MyComponents/payment/payment.component';
import { PaymentSuccessfulComponent } from './MyComponents/payment-successful/payment-successful.component';
import { RenewPaymentComponent } from './MyComponents/renew-payment/renew-payment.component';
import { RenewNotexpiredComponent } from './MyComponents/renew-notexpired/renew-notexpired.component';
import { CustomerListComponent } from './MyComponents/customer-list/customer-list.component';
import { ClaimListComponent } from './MyComponents/claim-list/claim-list.component';
import { AdminOptionsComponent } from './MyComponents/admin-options/admin-options.component';
import { FaqComponent } from './MyComponents/faq/faq.component';
import { VehicleInsuranceTypeComponent } from './MyComponents/vehicle-insurance-type/vehicle-insurance-type.component';
import { VehicleTypeComponent } from './MyComponents/vehicle-type/vehicle-type.component';
import { VehicleInfoFormComponent } from './MyComponents/vehicle-info-form/vehicle-info-form.component';
import { TravelFormComponent } from './MyComponents/travel-form/travel-form.component';
import { TravelTypeComponent } from './MyComponents/travel-type/travel-type.component';
import { ForgotPasswordComponent } from './MyComponents/forgot-password/forgot-password.component';
import { TermsandconditionsComponent } from './MyComponents/termsandconditions/termsandconditions.component';
import { ViewFileComponent } from './MyComponents/view-file/view-file.component';



const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  },
  {
    path:'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      {
      path: "",
      component: CustomerListComponent
      },
      {
        path: "customer-list",
        component: CustomerListComponent
      },
      {
        path: "claim-list",
        component: ClaimListComponent
      },
      {
        path: "admin-options",
        component: AdminOptionsComponent
      }
    ]
    
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [{
        path: '',
        component: MyInsuranceComponent
      },
      {
        path: 'my-insurance',
        component: MyInsuranceComponent
      },{
        path: 'options',
        component: OptionsComponent
      }]
    },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path:'terms-conditions',
    component:TermsandconditionsComponent
  },
  {
    path: 'calculate-premium',
    component: CalcPremiumComponent,
    children:[
      {
        path: 'cal-two-wheeler-pre',
        component: CalPreTwoWheelerComponent
      },
      {
        path: 'cal-four-wheeler-pre',
        component: CalPreFourWheelerComponent
      },
      {
        path: '',
        component: CalPreTwoWheelerComponent
      }
    ]
  },
  {
    path:'view-plans',
    component:ViewPlansComponent
  },
  {
    path:'view-plans-travel',
    component:ViewPlansTravelComponent
  },
  {
    path:'buy-insurance',
    component:BuyInsuranceComponent,
  },
  {
    path: 'vehicle',
    component: VehicleInsuranceTypeComponent
  },
  {
    path: 'vehicle-type',
    component: VehicleTypeComponent
  },
  {
    path:'motor-insurance',
    component:BuyVehicleInsuranceComponent
  },
  {
      path:'travel',
      component:TravelTypeComponent
  },
  {
    path: 'travel-form',
    component: TravelFormComponent
  },
  {
    path: 'all-plans',
    component: AllPlansComponent
  },
  {
    path: "claim",
    component: ClaimComponent
  },
  {
    path: "claim-form",
    component: ClaimFormComponent
  },
  {
    path: "claim-submitted",
    component: ClaimSubmittedComponent
  },
  {
    path:'payment',
    component:PaymentComponent
  },
  {
    path:'payment-successful',
    component:PaymentSuccessfulComponent
  },
  {
    path:'renew-payment',
    component:RenewPaymentComponent
  },
  {
    path:'renew-notexpired',
    component:RenewNotexpiredComponent
  },
  {
    path: 'vehicle-info-form',
    component: VehicleInfoFormComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'view-file',
    component: ViewFileComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
