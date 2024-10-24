export interface IProject {
  _id: string;
  title: string;
  location: string;
  images: any[];  
  description: string;
  year: number;
  video: any | undefined;  
  videoName?: string;
}
