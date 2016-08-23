import {Component} from '@angular/core';
import {VideoService} from "./video.service";

@Component({
    selector: 'video-progress',
    template: `
    <div id="progressMeterFull" (click)="videoService.seekVideo($event)">
      <div id="progressMeter" [style.width.px]="videoService.calculatedWidth" (click)="videoService.seekVideo($event)"></div>
    </div>
    <div id="thumbScrubber" (mousedown)="videoService.dragStart($event)" [style.top.px]="videoService.calculatedScrubY" [style.left.px]="videoService.calculatedWidth"></div>
    `
})
export class ProgressComponent {
  constructor(public videoService:VideoService) {}
}
