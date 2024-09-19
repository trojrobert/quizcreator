import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as dotenv from "dotenv";
import { ApiGateway } from 'aws-cdk-lib/aws-events-targets';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

dotenv.config()

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, "BaseLayer", {
      code: lambda.Code.fromAsset("../backend/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_10],
    });


    const apiLambda = new lambda.Function(this, "ApiFunction", {

      runtime: lambda.Runtime.PYTHON_3_10,
      code: lambda.Code.fromAsset("../backend/src/"),
      handler: "api.handler",
      layers: [layer],
      environment: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
      }

    });

    const gateway = new apiGateway.RestApi(this, "RestApi", {
      restApiName: "quiz api",

    });

    gateway.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(apiLambda),
    });

  }
}
