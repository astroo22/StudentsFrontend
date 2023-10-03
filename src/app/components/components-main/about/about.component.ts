import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Subject,fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('scrollableDiv', { static: false, read: ElementRef }) scrollableDiv: ElementRef;
  currentDisplay: string = 'about-project'; // default display
  isScrollable: boolean = false;
  private destroy$ = new Subject<void>();
  private threshold: number = 20;

  ngAfterViewInit() {
    fromEvent(this.scrollableDiv.nativeElement, 'scroll')
    .pipe(
      map(() => this.scrollableDiv.nativeElement),
      takeUntil(this.destroy$)
    )
    .subscribe((container: HTMLElement) => {
      this.calculateScrollable(container);
    });
    this.calculateScrollable(this.scrollableDiv.nativeElement);
    this.checkWindowResize();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  @HostListener('window:resize')
  onResize() {
    this.checkWindowResize();
  }

  calculateScrollable(container: HTMLElement) {
    this.isScrollable = container.scrollTop + container.clientHeight < container.scrollHeight - this.threshold;
  }

  checkWindowResize() {
    this.calculateScrollable(this.scrollableDiv.nativeElement);
  }
  // about-project
  aboutProjectTextpt1 = `Welcome to my innovative project, a comprehensive example of a modern business dashboard, meticulously crafted to replicate a production-level business intelligence tool.
   The creation of this platform underscores my proficiency in integrating diverse technologies to optimize business operations, like real-time data updates and monitoring, within a responsive and user-centric interface.
    This project not only displays my technical acumen but also my commitment to creating secure, efficient, and seamless user experiences.`;

  aboutProjectTextpt2 = `This project is imbued with advanced features expected in professional business environments, demonstrating a seamless CI/CD pipeline utilizing AWS CodePipeline, CodeBuild, and CodeDeploy.
   It employs Angular for the frontend and Go for the backend, maintaining a RESTful approach for handlers to guarantee standardized interactions throughout the application. 
   The architecture involves hosting the frontend on an S3 bucket and the backend on an EC2 server, with both development and production databases under Amazon RDS, utilizing PostgreSQL.
  Security is paramount; hence, stringent authentication is required on both frontend and backend to make alterations, coupled with CloudFront and NGINX routing level security to remove malicious requests.
   All components are encapsulated within a secure HTTPS protocol, ensuring data integrity and confidentiality. Please note, as I am in pursuit of employment opportunities, the resources are currently operating on AWS's free tier, so I've restricted school generation to a maximum of 50 students per grade.`;
  
   privacyText = `Rest assured, there is no intention or necessity to retain any data input into the application. Users have full control to delete their accounts and associated data.
    Any information, including emails, is purely for display purposes, and users are encouraged to use fictitious data as desired. The focus is only on showcasing my capabilities.`;

  // about-me
  aboutMeIntro = `I have a profound interest in science and the intricate workings of the world around me. My passion lies in the continuous pursuit of knowledge and understanding how the minutiae converge to form the bigger picture.
   I am diligent, adept at acquiring new skills, and have a multitude of hobbies, with cooking and plant cultivating being the predominant ones currently.`;

  aboutMePlants = `I cultivate a variety of produce, including several types of tomatoes, Hatch green chili, jalapenos, banana peppers, ghost peppers, and potatoes on my apartment balcony.
   Additionally, I nurture indoor plants such as a cayenne pepper plant and an assortment of vines and succulents. Whether it’s a Japanese Emperor tree or the unexpected transformation of cabbage head into a peculiar lettuce stick, each plant has its unique story.`;
           

  aboutMeCooking = `My love for cooking is intertwined with my passion for plant cultivating. There's a unique joy in utilizing fresh produce from my balcony in dishes like caprese chicken or transforming Hatch green chilies into jam.
   I’ve also delved into the art of meat smoking, finding immense satisfaction in perfecting smoked brisket over the weekends.`;


  aboutMeHome = `I share my home with two rescue cats, Vesemir and Mittens, each with their quirks, and my girlfriend, Lisa, an art student who’s influenced the aesthetic approach to my website, emphasizing the importance of design and style. 
  I’ve recently explored 3D printing and have ambitions to learn electrical engineering. While I am a homebody, my aspirations are boundless, and I seek a stable, rewarding career as a stepping stone towards achieving them.`;

  
  pastExperiencesText = ``;

  displayInfo(section: string): void {
      this.currentDisplay = section;
  }
}
