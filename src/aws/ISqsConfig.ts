export interface ISqsConfig {
    access: string;
    secret: string;
    region: string;
    commandQueueName: string;
    eventQueueName: string;
}
