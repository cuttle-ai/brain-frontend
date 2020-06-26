import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import QueryResult from "@cuttleai/visualizations/lib/models/query";
import { Property } from "../../../core/models";

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

  /**
   * propertyChange is emitted when any of the property of the queryResult is emitted
   */
  @Output()
  propertyChange: EventEmitter<Property> = new EventEmitter<Property>();

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
    {
      name: "Stacked Bar",
      icon: "/assets/images/visualizations/stacked-bar.svg",
      type: "STACKEDBARCHART",
    },
  ];

  ngOnInit() {}

  /**
   * this method in invoked when the visualization's property is changed
   * @param name
   * @param value
   */
  propertyChanged(name: string, value: any) {
    this.propertyChange.emit({ name, value });
  }
}

interface Visualization {
  name: string;
  icon: string;
  type: string;
}
