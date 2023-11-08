import { LightningElement,wire,track } from 'lwc';
import createAccountContact from '@salesforce/apex/BanktoBankCheck.SendAccountInformation';
import createAccountContact1 from '@salesforce/apex/BanktoBankCheck.createAccountContact1';
const columns = [
    {label : 'No', fieldName : 'rowNumber',type : 'number'},
    { 
        label: 'Id',
        fieldName: 'idofbank',
        type:'Id',
        typeAttributes: {
            label: { 
                fieldName: 'idofbank'
            },
            target : '_blank'
        }
    },
    {
        label: 'Description',
        fieldName: 'Description',
        type: 'text',
        sortable: true
    },
    {
        label: 'Transdate',
        fieldName: 'Transdate',
        type: 'Number',
        sortable: true
    },
    {
        label: 'Amount',
        fieldName: 'Amount',
        type: 'Number',
        sortable: true
    },
    {
        label: 'Drorcr',
        fieldName: 'Drorcr',
        type: 'text',
        sortable: true
    },
  
];

export default class BankToBankLwc extends LightningElement {
    @track columns = columns
    @track error;
    @track data ;
    lstRecords;
    lstRecords1;
    @track targetList = [];
    @track apexList = [];
    textBoxValue = '';
    //666666666666

    @wire(createAccountContact) wrappers ({
        error,
        data
    }) {
        if(data) {
            
            console.log('hello world'+data );
            this.data = data;
            for(var i=0; i<(this.data.length-1); i++){
                if(this.data[i].Transdate == this.data[i+1].Transdate){
                    if(this.data[i].Amount == this.data[i+1].Amount){
                    if(this.data[i].debit != this.data[i+1].debit){
                        if(this.data[i].Bankcode != this.data[i+1].Bankcode){
                      
                        this.targetList.push(this.data[i]);
                        this.targetList.push(this.data[i+1]);
                        i++;
                        }
                    }
                    }
                    
                }
            }
            let result = JSON.parse(JSON.stringify(this.data));
            //console.log('result==> ' + JSON.stringify(result));
            

            for(var i=0; i<result.length; i++){
                result[i].rowNumber = i+1;
            }
this.lstRecords = result;

let result1 = JSON.parse(JSON.stringify(this.targetList));
//console.log('result==> ' + JSON.stringify(result));


for(var i=0; i<result1.length; i++){
    result1[i].rowNumber = i+1;
}
this.lstRecords1 = result1;



        } else {
            this.error = error;
            this.lstRecords = [];
        }
    }
    getSelectedName(event) {
        this.apexList = [];
        const selectedRows = event.detail.selectedRows;
        this.apexList = selectedRows;
        
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++) {

            console.log('You selected: ' + selectedRows[i].Amount);

        }
    }
    callApexMethod(){
        console.log('You selected: ' + JSON.stringify(this.apexList));
        this.textBoxValue = JSON.stringify(this.apexList);
        createAccountContact1({input: this.textBoxValue })
    } 
 
}