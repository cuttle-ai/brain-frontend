import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VisualizationEditorComponent } from "./visualization-editor.component";

describe("SearchComponent", () => {
  let component: VisualizationEditorComponent;
  let fixture: ComponentFixture<VisualizationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizationEditorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
