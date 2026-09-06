import React from "react";


export default function  Features()  {
return (
<div className="features-container d-flex">

{/* LEFT SIDE */}
<div className="features-left p-4 text-white">
<h4>US</h4>

<div className="feature-item">
<p>✔ <strong>Protects personal info</strong></p>
<p className="sub-text">
Send and receive messages without exchanging name, phone, or email
</p>
</div>

<div className="feature-item">
<p>✔ <strong>No surprise fees</strong></p>
<p className="sub-text">
Private messaging via SQR Contact Messenger is included
</p>
</div>

<div className="feature-item">
<p>✔ <strong>Realtime scan alerts</strong></p>
<p className="sub-text">
Get notified when your code is found and scanned
</p>
</div>
</div>

{/* RIGHT SIDE */}
<div className="features-right p-4">
<h4>OTHERS</h4>

<div className="feature-item">
<p><strong>Exposes personal info</strong></p>
<p className="sub-text">
Requires exposing phone number, email, or other sensitive info with strangers
</p>
</div>

<div className="feature-item">
<p><strong>Subscription fees</strong></p>
<p className="sub-text">
May require fee to use messaging service
</p>
</div>

<div className="feature-item">
<p><strong>No alert when found</strong></p>
<p className="sub-text">
No notification when your code is found and scanned
</p>
</div>
</div>

</div>
);
};


