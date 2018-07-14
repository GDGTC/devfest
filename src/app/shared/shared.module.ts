import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPipesModule } from './custom-components.module';
import { GetSpeakerPipe } from './get-speaker.pipe';
import { ArrayOrMapPipe } from './array-or-map.pipe';


@NgModule({
    declarations: [
        GetSpeakerPipe,
        ArrayOrMapPipe,
    ],
    imports: [
        CustomPipesModule,
        CommonModule,
    ],
    exports: [
        CustomPipesModule,
        GetSpeakerPipe,
        ArrayOrMapPipe,
    ],
})
export class SharedModule { }
