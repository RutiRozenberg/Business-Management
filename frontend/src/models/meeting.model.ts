
export interface Meeting {
    _id: string;
    userId: string;
    startTime: Date;
    endTime: Date;
    serviceId: string;
    textMessage: string;
  }