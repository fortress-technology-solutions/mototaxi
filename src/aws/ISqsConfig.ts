export interface ISqsConfig {
    access: string;
    secret: string;
    region: string;
    commandQueueUrl: string;
    eventQueueUrl: string;
    pollingSeconds?: number;
}
