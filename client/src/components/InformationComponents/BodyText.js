const step1 = "website presents a selection of the highest quality vehicles and the most reliable dealers on the market. All you have to do is select the vehicle you want to import. Clicking on any vehicle will open the specifications and all the relevant details about the vehicle"
const step2 = " each vehicle you are presented with the dealer responsible for the transaction. At this stage you will be required to contact the dealer in order to inform him that you are interested in the purchase and set all the details of the payment. After sending the request to the dealer he will send back to you all the necessary documents about the vehicle. For example vehicle specifications, licenses, etc. Each dealer has his own method and the clearing companies. NOTE: Payment is not made through this site";
const step3 = "are required to fill out the car import forms according to Israeli law. The forms are accessible through the website and can be filled out easily and quickly. A decision on your application will be given within 21 working days from applying. Rishuy call *5678 Call from abroad +972-3-9695678 Operating hours Sunday to Thursday, from 7am to 8pm Friday and holiday eves, from 7am to 1pm 24 hour automated call service Service languages: Hebrew, Arabic"
const step4 = "customs broker is responsible for receiving and approving your vehicle in Israel. Customs brokers ensure that the importer is complying with various Customs regulations. They are able to assist with complex issues and may be able to provide feedback on how to reduce the duties and taxes you pay. The payment must be arranged with the customs broker in advance."
const step5 = "will make sure the vehicle reaches all the way to you! A reliable and leading delivery company in Israel that makes thousands of deliveries every day. The delivery details are required to be filled out in a dedicated form displayed on the website."
const step6 = "Enjoy your new vehicle!"

function bodyText(step){
    if (step === 1) {
        return (
          <div className="f-19">
            <b>Our </b> website presents a selection of the highest quality
            vehicles and the most reliable dealers on the market.
            <br />
            All you have to do is select the vehicle you want to import.
            <br />
            Clicking on any vehicle will open the specifications and all the
            relevant details about the vehicle.
          </div>
        );
    } else if (step === 2) {
        return (
          <div className="f-19">
            <b>For</b> each vehicle you are presented with the dealer
            responsible for the transaction.
            <br />
            At this stage you will be required to contact the dealer in order to
            inform him that you are interested in the purchase and set all the
            details of the payment.
            <br />
            After sending the request to the dealer he will send back to you all
            the necessary documents about the vehicle. For example vehicle
            specifications, licenses, etc.
            <br />
            Each dealer has his own method and the clearing companies. NOTE:
            Payment is not made through this site.
          </div>
        );
    } else if (step === 3) {
         return (
           <div className="f-19">
             <b>You</b> are required to fill out the car import forms according
             to Israeli law.
             <br />
             The forms are accessible through the website and can be filled out
             easily and quickly.
             <br />
             A decision on your application will be given within 21 working days
             from applying.
             <br />
             Rishuy call *5678
             <br />
             Call from abroad +972-3-9695678
             <br />
             <span style={{ textDecoration: "underline" }}>
               Operating hours:
             </span>
             <br />
             Sunday to Thursday, from 7am to 8pm
             <br />
             Friday and holiday eves, from 7am to 1pm
             <br />
             24 hour automated call service Service
             <br />
             languages: Hebrew, Arabic
           </div>
         );
    } else if (step === 4) {
        return (
          <div className="f-19">
            <b>A</b> customs broker is responsible for receiving and approving
            your vehicle in Israel.
            <br />
            Customs brokers ensure that the importer is complying with various
            Customs regulations.
            <br />
            They are able to assist with complex issues and may be able to
            provide feedback on how to reduce the duties and taxes you pay.
            <br />
            The payment must be arranged with the customs broker in advance.
          </div>
        );
    } else if (step === 5) {
         return (
           <div className="f-19">
             <b>DHL</b> will make sure the vehicle reaches all the way to you!
             <br />
             A reliable and leading delivery company in Israel that makes
             thousands of deliveries every day.
             <br />
             The delivery details are required to be filled out in a dedicated
             form displayed on the website.
           </div>
         );
    } else {
        return (
          <div className="f-19">
            <b>We are happy to help!</b>
            <br />
            Enjoy your new vehicle
          </div>
        );
    }
}
export { bodyText };