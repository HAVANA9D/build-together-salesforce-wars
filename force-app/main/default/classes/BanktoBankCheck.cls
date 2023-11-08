public class BanktoBankCheck {
    @AuraEnabled(cacheable=true)
    public static List<OriginalBank> SendAccountInformation() {
        /*
List<Kotak811_Debit__c> kk = [select id,Amount__c, Transaction_date__c,Dr_Cr__c,Description__c,Debit__c, Credit__c  from Kotak811_Debit__c];
List<Indusland_debit__c> ii = [select id,Amount__c, Transaction_date__c,Dr_Cr__c,Description__c,Debit__c, Credit__c  from Indusland_debit__c];        
List<Paytm_bank__c> pp = [select id,Amount__c, Transaction_date__c,Dr_Cr__c,Description__c,Debit__c, Credit__c  from Paytm_bank__c ];       
List<Axis_Debit__c> aa = [select id,Amount__c, Transaction_date__c,Dr_Cr__c,Description__c,Debit__c, Credit__c  from Axis_Debit__c  ];  
List<Sbi_Debit__c> ss = [select id,Amount__c, Transaction_date__c,Dr_Cr__c,Description__c,Debit__c, Credit__c  from Sbi_Debit__c ];   
*/
        
        List<Kotak811_Debit__c> kk = [select id,Amount__c, Transaction_date__c,Dr_Cr__c,Description__c,Debit__c, Credit__c  from Kotak811_Debit__c where Done_with_Contact__c = false];
        List<Indusland_debit__c> ii = [select id,Amount__c, Transaction_date__c,Dr_Cr__c,Description__c,Debit__c, Credit__c  from Indusland_debit__c  where Done_with_Contact__c = false];        
        List<Paytm_bank__c> pp = [select id,Amount__c, Transaction_date__c,Dr_Cr__c,Description__c,Debit__c, Credit__c  from Paytm_bank__c  where Done_with_Contact__c = false];       
        List<Axis_Debit__c> aa = [select id,Amount__c, Transaction_date__c,Dr_Cr__c,Description__c,Debit__c, Credit__c  from Axis_Debit__c  where Done_with_Contact__c = false ];  
        List<Sbi_Debit__c> ss = [select id,Amount__c, Transaction_date__c,Dr_Cr__c,Description__c,Debit__c, Credit__c  from Sbi_Debit__c  where Done_with_Contact__c = false];  
        List<OriginalBank> wrapList = new List<OriginalBank>();
        List<OriginalBank> bankToBankOne = new List<OriginalBank>();
        List<OriginalBank> bankToBankTwo = new List<OriginalBank>();
        for(Kotak811_Debit__c acc1 : kk){
            OriginalBank org = new OriginalBank();
            org.idofbank = acc1.id;
            org.Description =acc1.Description__c;
            org.Amount =acc1.Amount__c;
            org.Transdate =acc1.Transaction_date__c;
            org.Drorcr =acc1.Dr_Cr__c;
            org.debit = acc1.Debit__c;
            org.credit = acc1.Credit__c;
            org.Bankcode = String.valueOf(acc1.Id).substring(0,3);
            wrapList.add(org);
        }
        for(Indusland_debit__c acc2 : ii){
            OriginalBank org = new OriginalBank();
            org.idofbank = acc2.id;
            org.Description =acc2.Description__c;
            org.Amount =acc2.Amount__c;
            org.Transdate =acc2.Transaction_date__c;
            org.Drorcr =acc2.Dr_Cr__c;
            org.debit = acc2.Debit__c;
            org.credit = acc2.Credit__c;
             org.Bankcode = String.valueOf(acc2.Id).substring(0,3);
            wrapList.add(org);
        }
        for(Paytm_bank__c acc3 : pp){
            OriginalBank org = new OriginalBank();
            org.idofbank = acc3.id;
            org.Description =acc3.Description__c;
            org.Amount =acc3.Amount__c;
            org.Transdate =acc3.Transaction_date__c;
            org.Drorcr =acc3.Dr_Cr__c;
            org.debit = acc3.Debit__c;
            org.credit = acc3.Credit__c;
             org.Bankcode = String.valueOf(acc3.Id).substring(0,3);
            wrapList.add(org);
        } 
        for(Axis_Debit__c acc4 : aa){
            OriginalBank org = new OriginalBank();
            org.idofbank = acc4.id;
            org.Description =acc4.Description__c;
            org.Amount =acc4.Amount__c;
            org.Transdate =acc4.Transaction_date__c;
            org.Drorcr =acc4.Dr_Cr__c;
            org.debit = acc4.Debit__c;
            org.credit = acc4.Credit__c;
             org.Bankcode = String.valueOf(acc4.Id).substring(0,3);
            wrapList.add(org);
        }
        for(Sbi_Debit__c acc5 : ss){
            OriginalBank org = new OriginalBank();
            org.idofbank = acc5.id;
            org.Description =acc5.Description__c;
            org.Amount =acc5.Amount__c;
            org.Transdate =acc5.Transaction_date__c;
            org.Drorcr =acc5.Dr_Cr__c;
            org.debit = acc5.Debit__c;
            org.credit = acc5.Credit__c;
             org.Bankcode = String.valueOf(acc5.Id).substring(0,3);
            wrapList.add(org);
        }
        
        wrapList.sort();
        for(Integer i = 0; i < wrapList.size()-1; i++){
            if(wrapList[i].Transdate == wrapList[i+1].Transdate){
                if(wrapList[i].Amount == wrapList[i+1].Amount){
                    bankToBankOne.add(wrapList[i]); 
                    bankToBankTwo.add(wrapList[i+1]);   
                }
                
            }
        }
        for(OriginalBank acc10 : wrapList){
            //system.debug('hellooo world'+acc10);
        }
        return wrapList;
        
    }
    @auraenabled
    public static void createAccountContact1(String input){
        system.debug('wrapperText:'+input);
        List<OriginalBank> wrapper=(List<OriginalBank>)JSON.deserialize(input,List<OriginalBank>.class);
        //system.debug('wrapper:'+wrapper);
        List<Bank_To_Bank__c> bankcollvar = new List<Bank_To_Bank__c>();
        for(Integer i = 0; i < wrapper.size()-1; i++){
            Bank_To_Bank__c bbc = new Bank_To_Bank__c();
            if(wrapper[i].Transdate == wrapper[i+1].Transdate){
                if(wrapper[i].Amount == wrapper[i+1].Amount){
                    String myIdPrefix = String.valueOf(wrapper[i].idofbank).substring(0,3);
                    String myIdPrefix1 = String.valueOf(wrapper[i+1].idofbank).substring(0,3);
                    system.debug('id prefffff'+myIdPrefix+'.   .'+myIdPrefix1);
                    if(myIdPrefix =='a0X'){bbc.Axis_debit__c =wrapper[i].idofbank;}
                    else if(myIdPrefix =='a0T'){bbc.Kotak811_Debit__c =wrapper[i].idofbank;}
                    else if(myIdPrefix =='a0Y'){bbc.Sbi_Debit__c =wrapper[i].idofbank;}
                    else if(myIdPrefix =='a0V'){bbc.Indusland_debit__c =wrapper[i].idofbank;}
                    else if(myIdPrefix =='a0W'){bbc.Paytm_bank_debit__c =wrapper[i].idofbank;}
                    else {}
                    if(myIdPrefix1 =='a0X'){bbc.Axis_debit__c =wrapper[i+1].idofbank;}
                    else if(myIdPrefix1 =='a0T'){bbc.Kotak811_Debit__c =wrapper[i+1].idofbank;}
                    else if(myIdPrefix1 =='a0Y'){bbc.Sbi_Debit__c =wrapper[i+1].idofbank;}
                    else if(myIdPrefix1 =='a0V'){bbc.Indusland_debit__c =wrapper[i+1].idofbank;}
                    else if(myIdPrefix1 =='a0W'){bbc.Paytm_bank_debit__c =wrapper[i+1].idofbank;}
                    else {}
                    
                    bankcollvar.add(bbc);
                    
                    
                }
                
            }
        }
        insert bankcollvar;
        
    }
    
    
    
    public class OriginalBank implements Comparable{
        @AuraEnabled
        public id idofbank { get; set; }
        @AuraEnabled
        public String Description { get; set; } 
        @AuraEnabled
        public Decimal Amount { get; set; }
        @AuraEnabled
        public Date Transdate { get; set; }
        @AuraEnabled
        public String Drorcr { get; set; }
        @AuraEnabled
        public boolean debit { get; set; }
        @AuraEnabled
        public boolean credit { get; set; }
        @AuraEnabled
        public String Bankcode { get; set; } 
        
        public Integer compareTo(Object recordTocompare)
        {   OriginalBank that = (OriginalBank)recordTocompare;
         if (this.Transdate > that.Transdate) {
             return 1;
         } else if (this.Transdate < that.Transdate) {
             return -1;
         } else {
             // First value the same, consider second value
             if (this.Amount > that.Amount) {
                 return 1;
             } else if (this.Amount < that.Amount) {
                 return -1;
             } else {
                 return 0;
             }          
         }   
         /*

OriginalBank that = (OriginalBank)recordTocompare;
if (this.Transdate > that.Transdate) return 1;
if (this.Transdate < that.Transdate) return -1;
return 0;   */
        }
    }
}