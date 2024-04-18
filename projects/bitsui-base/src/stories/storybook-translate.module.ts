import {NgModule} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

/**
 A utility module adding I18N support for Storybook stories
 **/
@NgModule({
  imports: [TranslateModule.forRoot()],
})
export class StorybookTranslateModule {
  constructor(translateService: TranslateService) {
    console.log("Translations: ", translateService.translations);
    translateService.setDefaultLang("en-US");
    translateService.use("en-US");
  }
}
