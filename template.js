export default ({markup, css}) => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          
          <link rel="icon" href="https://res.cloudinary.com/htmediacloud/image/upload/v1621792139/TDT-Favicon_biehzv.ico" rel="shortcut icon"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          
          <title>Tiendea-T</title>
          <style>
              a{
                text-decoration: none
              }
          </style>
        </head>
        <body style="margin:0">
          <div id="root">${markup}</div>
          <style id="jss-server-side">${css}</style>
          <!--<script id="stripe-js" src="https://js.stripe.com/v3/" async></script>-->
          <script type="text/javascript" src="https://checkout.epayco.co/checkout.js"></script>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`
}
