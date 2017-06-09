export interface ISqsConfig {
    access: string;
    secret: string;
    region: string;
    incomingQueueUrl: string;
    outgoingQueueUrl: string;
}
