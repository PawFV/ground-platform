/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Observation } from './../../shared/models/observation/observation.model';
import { ObservationService } from './../../services/observation/observation.service';
import { FeatureService } from './../../services/feature/feature.service';
import { switchMap } from 'rxjs/operators';
import { ProjectService } from './../../services/project/project.service';
import { List } from 'immutable';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ground-feature-panel',
  templateUrl: './feature-panel.component.html',
})
export class FeaturePanelComponent {
  readonly observations$: Observable<List<Observation>>;

  constructor(
    private projectService: ProjectService,
    private featureService: FeatureService,
    private observationService: ObservationService
  ) {
    this.observations$ = projectService
      .getActiveProject$()
      .pipe(
        switchMap(project =>
          featureService
            .getSelectedFeature$()
            .pipe(
              switchMap(feature =>
                observationService.observations$(project, feature)
              )
            )
        )
      );
  }
}