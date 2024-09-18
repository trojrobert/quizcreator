# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template


quiz request
{
  "text": "175.000 € \nKaufpreis66 m²\nWohnfläche (ca.)2\nZimmer\nImmobilienart\nKategorie\nKaufpreis\nWohnfläche\nZimmer\nBezug\nKäuferprovisionZusammenfassung\nWohnung\nEtagenwohnung\n175.000 €\nca. 66,00 m²\n2\nsofort\n3,57% incl. MWSTAnbieter\nImmobilien Walther Leipzig \nWittenberger Straße 15 \n04129 Leipzig\nAnsprechpartner\nHerr Sven Walther \nTelefon: 0341/9188518 \nFax: 0341/9188519 \n2­Raum Wohnung++ 2.OG++ Balkon++ EBK++ ruhige Seitenstraße++sofort frei\n04177 Leipzig (Altlindenau), Karl­Ferlemann­Straße 51\nBalkon, Kelleranteil, Einbauküche, Zentralheizung, frei\nEnergie / Versorgung\nEnergieausweis für diesen Gebäudetyp nicht\nnotwendigEnergieträger:  Gas\nZentralheizung\nObjektbeschreibung Die zum Verkauf stehende 2 ZKB Wohnung befindet sich im 2.",
  "numQuestions": 3,
  "numOptions": 3

}

response 

 [
    {
        "question": "What is the approximate living area of the property?",
        "options": ["66 m²", "77 m²", "55 m²"],
        "correct_answer": "66 m²"
    },
    {
        "question": "How many rooms does the property have?",
        "options": ["1 room", "2 rooms", "3 rooms"],
        "correct_answer": "2 rooms"
    },
    {
        "question": "What is the immediate availability status of the property?",
        "options": ["Available in 1 month", "Available immediately", "Not available"],
        "correct_answer": "Available immediately"
    }
]
