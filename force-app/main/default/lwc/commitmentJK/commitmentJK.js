import {LightningElement,api,wire,track} from 'lwc';
import {loadScript} from "lightning/platformResourceLoader";
import JSPDF from '@salesforce/resourceUrl/jspdf';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
const FIELDS = [
'Opportunity.Id','Opportunity.Name',  'Opportunity.Account.Name','Opportunity.Principal_Loan_Amount__c','Opportunity.Applicant_Email__c'
,'Opportunity.Applicant_Phone_Number__c','Opportunity.Account.BillingStreet','Opportunity.Mortgage_Rank__c','Opportunity.Lender_Fee__c'
,'Opportunity.Interest_Rate__c','Opportunity.Monthly_Interest__c','Opportunity.First_Payment_Date__c','Opportunity.Maturity_Date__c'
,'Opportunity.Payment_Method__c','Opportunity.Non_Payment_NSF__c','Opportunity.Standard_Charge_Terms__c','Opportunity.Property_Insurance__c'
,'Opportunity.Title_Insurance__c','Opportunity.Applicant__r.Name','Opportunity.Lenders__r.Name','Opportunity.Lender_s_Address__c'
,'Opportunity.Property_Market_Value__c','Opportunity.General_Condition__c','Opportunity.CloseDate'

];
export default class CommitmentPDF extends LightningElement {
@track name;
@track accountName;
@track principalamount;
@track appEmail;
@track appPhoneNum;
@track accAddress;
@track mortgageRank;
@track lenderFee;
@track intrestRate;
@track montlyIntrest;
@track firstPaymentDate;
@track maturityDate;
@track paymentMethod;
@track nonPaymentNSF;
@track standardChargeTerm;
@track propertyInsurance;
@track titleInsurance;
@track lenderName;
@track lenderAddress;
@track contactName;
@track proValue;
@track generalcondition;
@track closeddate;
@api recordId;

connectedCallback(){
const formattedDate = new Date().toDateString();
const [, month, day, year] = formattedDate.split(' ')

const datelist = `${month} ${day}, ${year}`
const monthlist = `${month}, ${year}`
this.date=datelist ;
this.monthDate =monthlist ;
}


@wire(getRecord, {
recordId: "$recordId",
fields:FIELDS
})
contactData({data,error}){
if(data){
let USDollar = new Intl.NumberFormat('en-US', {
style: 'currency',
currency: 'USD',
});
var regp = /[^0-9.-]+/g;

console.log('data'+JSON.stringify(data))
this.name=getFieldValue(data,'Opportunity.Name');
this.accountName=getFieldValue(data,'Opportunity.Account.Name')
this.principalamount=USDollar.format(getFieldValue(data,'Opportunity.Principal_Loan_Amount__c'));
this.proValue=USDollar.format(getFieldValue(data,'Opportunity.Property_Market_Value__c'));
this.appEmail=getFieldValue(data,'Opportunity.Applicant_Email__c');
this.appPhoneNum=getFieldValue(data,'Opportunity.Applicant_Phone_Number__c');
this.accAddress =getFieldValue(data,'Opportunity.Account.BillingStreet');
this.mortgageRank =getFieldValue(data,'Opportunity.Mortgage_Rank__c');
this.lenderFee =USDollar.format(getFieldValue(data,'Opportunity.Lender_Fee__c'));
this.intrestRate =getFieldValue(data,'Opportunity.Interest_Rate__c');
this.montlyIntrest =USDollar.format(getFieldValue(data,'Opportunity.Monthly_Interest__c'));
//this.firstPaymentDate =getFieldValue(data,'Opportunity.First_Payment_Date__c');

const dateValue = getFieldValue(data,'Opportunity.First_Payment_Date__c');
var splittedDate = splitDate(dateValue);
this.firstPaymentDate = splittedDate;
const dateValue1 = getFieldValue(data,'Opportunity.Maturity_Date__c');
var splittedDate1 = splitDate(dateValue1);
this.maturityDate = splittedDate1;
/*
if (dateValue1) {
            const dateObject = new Date(dateValue1);
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            
            // Format the date as "Month Name Day Year"
            this.maturityDate = `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
        }
        */
const dateValue2 = getFieldValue(data,'Opportunity.CloseDate');
var splittedDate2 = splitDate(dateValue2);
this.closeddate = splittedDate2;
function splitDate(date){
  var result = date.split('-');
   var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
           var formatedDate = `${months[Number(result[1])]} ${result[2]}, ${result[0]}`;
  console.log('result_____'+result);
    console.log('result. formatDate_____'+`${months[Number(result[1])]} ${result[2]}, ${result[0]}`);
  return formatedDate;
  
}

this.paymentMethod =getFieldValue(data,'Opportunity.Payment_Method__c');
this.nonPaymentNSF =getFieldValue(data,'Opportunity.Non_Payment_NSF__c');
this.standardChargeTerm =getFieldValue(data,'Opportunity.Standard_Charge_Terms__c');
this.propertyInsurance =getFieldValue(data,'Opportunity.Property_Insurance__c');
this.titleInsurance =getFieldValue(data,'Opportunity.Title_Insurance__c');
this.contactName=getFieldValue(data,'Opportunity.Applicant__r.Name');
this.lenderName=getFieldValue(data,'Opportunity.Lenders__r.Name');
this.lenderAddress =getFieldValue(data,'Opportunity.Lender_s_Address__c');

if (getFieldValue(data,'Opportunity.General_Condition__c') === 'Open') {
            this.generalcondition = 'open';
        } else {
            this.generalcondition = 'closed';
        }
console.log('generalcondition'+this.generalcondition);
}
else if(error){
console.log(error)
}
}
renderedCallback(){
if (this.jsPdfInitialized) {
return;
}
this.jsPdfInitialized = true;

Promise.all([
loadScript(this, JSPDF)
]);
}
generatePdf(){

const { jsPDF } = window.jspdf;
const doc = new jsPDF({

});
doc.setFontSize(10);
doc.setFont("Calibri", "normal");
doc.text(this.date, 30, 35)
doc.setFontSize(12);
doc.setFont("Calibri", "bold");
doc.line(77, 42.5, 135, 42.5);
doc.text("MORTGAGE COMMITMENT", 77, 42)
doc.setFont("Calibri", "normal");
doc.setFontSize(10);
doc.text("Borrower/Mortgagor: ", 30, 57)
doc.text(String(this.contactName), 90, 57)
doc.text("Borrower’s Contact: ", 30, 64)
doc.text(String(this.appPhoneNum), 90, 64)
//doc.text(String(this.appEmail), 90, 65)
doc.text("Subject:  ", 30, 72)
doc.text(this.accountName, 90, 72)
//doc.text(this.accountName, 90, 72)
doc.text("Lender/Mortgagee:  ", 30, 80)
//doc.text(String(this.lenderName), 90, 80)
doc.text("2639051 Ontario Inc. ", 90, 80)
doc.text("Lender’s Address:   ", 30, 88)
doc.text(String(this.lenderAddress), 90, 88)


doc.text("Mortgage Rank:    ", 30, 96)
doc.text(String(this.mortgageRank), 90, 96)

doc.text("Property Market Value :", 30, 104)
doc.text(String(this.proValue), 90, 104)

doc.text("Principal Amount:", 30, 112)
doc.text(String(this.principalamount), 90, 112)

doc.text("Lender Fee: ", 30, 120)
doc.text(String(this.lenderFee), 90, 120)

doc.text("Closing Date (subject to change): ", 30, 128)
doc.text(this.closeddate, 90, 128)

doc.text("Interest Rate:  ", 30, 136)
doc.text(String(this.intrestRate)+" % Per annum,calculated yearly,not in advance", 90, 136)
//doc.text("% Per annum,calculated yearly,not in advance", 97, 136)
doc.text("Mortgage Term:", 30, 144)
doc.text("12 Months (Open)", 90, 144)

doc.text("Payment Frequency:", 30, 152)
doc.text("Monthly (interest only)",90,152)

doc.text("Monthly Interest Payment:", 30, 160)
doc.text(String(this.montlyIntrest), 90, 160)

doc.text("First Payment Date:", 30, 168)
doc.text(String(this.firstPaymentDate), 90, 168)

doc.text("Last Payment/Maturity Date:", 30, 176)
doc.text(String(this.maturityDate), 90, 176)

doc.text("Payment Method:", 30, 184)
doc.text(String(this.paymentMethod), 90, 184)


doc.text("Non-Payment/NSF:", 30, 192)
doc.text(String(this.nonPaymentNSF), 90, 192)

doc.text("Standard Charge Terms:", 30, 200)
doc.text(String(this.standardChargeTerm), 90, 200)

doc.text("Property Insurance:", 30, 208)
doc.text(String(this.propertyInsurance), 90, 208)

doc.text("Title Insurance: ", 30, 216)
doc.text(String(this.titleInsurance), 90, 216)


doc.text("General Conditions: ", 30, 224)
doc.text("This mortgage is "+String(this.generalcondition)+" ; prepayment is subject to three (3) months  ", 90, 224)
doc.text("interest bonus. Partial payments will not be accepted. ", 90, 229)
doc.text("Renewal:", 30, 237)
doc.text("No renewal option.", 90, 237)
doc.text("Borrower’s Initials: __________", 135, 250)

doc.addPage("a4", "2");
doc.setFont("Calibri", "bold");
doc.text("Additional Provisions:", 30, 40)

doc.setFont("Calibri", "normal");
const bulletPoints = [
'Please refer to the Lender’s Schedule A for Additional Terms and Conditions; and',
'If the mortgage is not discharged at maturity, a $5,000.00 fee will be charged in addition to the '
];
// Set the starting Y coordinate for the bullet points
let startY = 50;

// Loop through each bullet point and add it to the document
bulletPoints.forEach(point => {
doc.text(30, startY, '•'); // Adding a bullet point symbol
doc.text(40, startY, point); // Adding the bullet point text
startY += 10; // Adjusting Y coordinate for the next bullet point
});
doc.text("balance due after maturity." ,40 ,66)
//doc.setFont("Calibri", "bold");
doc.line(77, 86.5, 130, 86.5);
doc.setFontSize(11);
    // Load the custom font from the static resource
    const customFontFile = 'TimesNewRomanBoldItalic/TimesNewRomanBoldItalic.ttf';
    doc.addFont(customFontFile, 'TimesNewRomanBoldItalic', 'normal');

    // Set the font for the text
    doc.setFont("TimesNewRomanBoldItalic","bolditalic");
doc.text("Acceptance & Acknowledgement", 77, 86)

doc.setFont("Calibri", "normal");
doc.setFontSize(10);
doc.text("The undersigned hereby acknowledge receipt of the signed copy of Mortgage Commitment Letter and  ", 30, 100)
doc.text("accepts the terms and conditions stated herein.", 30, 105)

doc.text("Dated at the City of Toronto in the Province of Ontario, on this _____ day of "+this.monthDate+".", 30, 115)
doc.text("Lender/Mortgagee:  ", 30, 125)
doc.text(String(this.lenderName), 70, 125)
doc.text("Signature: ", 30, 135)
doc.setLineDash([1]);
doc.line(70, 135, 110, 135);
doc.text("Name: ", 30, 145)
doc.setLineDash([1]);
doc.line(70, 145, 110, 145);
doc.text("Title: ", 30, 155)
doc.setLineDash([1]);
doc.line(70, 155, 110, 155);
doc.text("I have authority to bind the Corporation ", 30, 165)
doc.text("Dated at the City of Toronto in the Province of Ontario, this _____ day of "+this.monthDate+".", 30, 185)
doc.text("Borrower/Mortgagor:", 30, 195)
doc.setLineDash([0]);
doc.line(90, 195, 135, 195);
doc.line(90, 210, 135, 210);

doc.save("Commitment.pdf");
}
generateData(){
this.generatePdf();
}
@api invoke() {
//Here insert your code
console.log('Hello, world!');
this.generatePdf();
}
}