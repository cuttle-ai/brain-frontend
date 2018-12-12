import { Component, OnInit, Input } from '@angular/core';
import * as Fuse from 'fuse.js';

import { Theme, LightTheme } from 'src/app/theme/theme';

@Component({
  selector: 'brain-connect-sources',
  templateUrl: './connect-sources.component.html',
  styleUrls: ['./connect-sources.component.scss']
})
export class ConnectSourcesComponent implements OnInit {


  /**
   * theme determnines the theme of the login page
   */
  @Input()
  theme: Theme = new LightTheme();

  /**
   * sources has the list of sources to be used for connecting
   */
  sources: any[] = [
    {
      name: 'CSV',
      description: 'Comma separated files',
      icon: 'fa fa-file',
      tags: ['file', 'csv'],
      acceptedFileTypes: '.csv',
      toggle: this.toggleFileSource.bind(this),
    },
    {
      name: 'Mysql',
      description: 'Mysql database',
      icon: 'fa fa-database',
      tags: ['database', 'db', 'mysql'],
      toggle: this.toggleFileSource.bind(this),
    }
  ];

  /**
   * filteredSources has the list of sources filtere by search
   */
  filteredSources: any[] = [];

  /**
   * searchDict is the dictionary to be used for searching for the search fuzzy
   */
  searchDict: any;

  /**
   * search is the search string for the sources list
   */
  search: string = '';

  /**
   * style of the page
   */
  style: object = {
    BACKGROUND: {
      'background-color': this.theme.PrimaryBackgroundColor
    },
    SOURCESITEM: {
      'background-color': this.theme.PrimaryForegroundColor
    }
  }

  /**
   * fileuploadModal sets the state of the visiblity of the file upload modal
   */
  fileuploadModal: boolean = false;

  /**
   * selectedSource is the currently selected source 
   */
  selectedSource: any; 

  /**
   * We will do the necessary initialisations required by this component
   */
  constructor() {
    /*
     * We will init the fuse search
     * Then we will set the filtered sources
     */
    this.searchDict = new Fuse(this.sources, {keys: [{name: 'name', weight: 0.8}, {name: 'description', weight: 0.2}]});
    this.filteredSources = this.sources;
  }

  /**
   * searchChanged is invoked when the user search changes
   */
  searchChanged() {
    /**
     * We will simply put the filtered source as per fuzzy search or else we will use the source given searhc is empty
     */
    this.filteredSources = this.search && this.search.length > 0?this.searchDict.search(this.search): this.sources;
  }

  /**
   * toggleFileSource toggle the file upload modal
   * 
   * @param {any} source is the source that has been selected by the user
   */
  toggleFileSource(source: any) {
    this.fileuploadModal = !this.fileuploadModal;
    this.selectedSource = source;
  }

  ngOnInit() {
  }

}
