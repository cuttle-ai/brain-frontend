import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import QueryResult from "@cuttleai/visualizations/lib/models/query";

/**
 * VisualizationEditorComponent is the viusalization editor for the app
 *
 * @example
 *          <brain-visualization-editor>
 *          </brain-visualization-editor>
 */
@Component({
  selector: "brain-visualization-editor",
  templateUrl: "./visualization-editor.component.html",
  styleUrls: ["./visualization-editor.component.scss"],
})
export class VisualizationEditorComponent implements OnInit {
  /**
   * queryResult stores the result of a search query
   */
  @Input()
  queryResult: QueryResult;

  @Output()
  visualisationTypeChanged: EventEmitter<string> = new EventEmitter<string>();

  /**
   * visualiozations holds the list of visualizations
   */
  visualizations: Visualization[] = [
    {
      name: "Table",
      icon: "/assets/images/visualizations/table.svg",
      type: "TABLE",
    },
    {
      name: "Column",
      icon: "/assets/images/visualizations/column.svg",
      type: "COLUMNCHART",
    },
    {
      name: "Line",
      icon: "/assets/images/visualizations/line.svg",
      type: "LINECHART",
    },
    {
      name: "Pie",
      icon: "/assets/images/visualizations/pie.svg",
      type: "PIECHART",
    },
    {
      name: "Bar",
      icon: "/assets/images/visualizations/bar.svg",
      type: "BARCHART",
    },
    {
      name: "Stacked Column",
      icon: "/assets/images/visualizations/stacked-column.svg",
      type: "STACKEDCOLUMNCHART",
    },
  ];

  ngOnInit() {}

  /**
   * this method is invoked when the visualization is changed
   * @param type type of the new visualization
   */
  visualizationTypeChanged(type: string) {
    this.visualisationTypeChanged.emit(type);
  }
}

interface Visualization {
  name: string;
  icon: string;
  type: string;
}
