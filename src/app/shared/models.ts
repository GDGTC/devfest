export class Session{
    $key: string = "new";
    title: string;
    description: string;
    track: string;
    room: string;
    startTime: string;
    endTime: string;
    slidesUrl: string; 
    videoUrl: string;
    speakers: string[];
}

export class Speaker{
    $key: string = "new";
    name: string;
    bio: string;
    company: string;
    twitter: string;
    imageUrl: string;
    website: string;
}