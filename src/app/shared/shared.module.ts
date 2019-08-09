import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncodeURI } from './encode-uri.pipe';
import { GetSpeakerPipe } from './get-speaker.pipe';
import { DataService } from './data.service';


/**
 * Provides DataService, getSpeaker Pipe, EncodeURI pipe
 */
@NgModule({
    declarations: [
        EncodeURI,
        GetSpeakerPipe,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        EncodeURI,
        GetSpeakerPipe,
    ],
    providers: [
        DataService,
    ]
})
export class SharedModule { }
