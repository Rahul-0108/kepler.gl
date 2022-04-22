// Copyright (c) 2022 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import {Icons,withState} from 'kepler.gl/components';

import {SidePanelFactory} from 'kepler.gl/components';
import {visStateLens} from 'kepler.gl/reducers';

import {setMapConfig} from '../app-reducer';


const MyPanels = props => {
  console.log(props);
  if (props.activeSidePanel === 'rocket') {
    return <div className="rocket-panel">Rocket</div>;
  } else if (props.activeSidePanel === 'chart') {
    return <div className="chart-panel">Charts?</div>;
  }

  return null;
};

MyPanels.defaultProps = {
  getProps: props => ({
    layers: props
  })
};

function CustomSidePanelsFactory() {
  return withState(
    // lenses
    [visStateLens],
    // mapStateToProps
    state => ({mapState: state}),
    {
      onClickSaveConfig: setMapConfig
    }
  )(MyPanels);
}
function CustomSidePanelFactory(...deps) {
  const CustomSidePanel = SidePanelFactory(...deps);
  CustomSidePanel.defaultProps = {
    ...CustomSidePanel.defaultProps,
    panels: [
     
      {
        id: 'rocket',
        label: 'Rocket',
        iconComponent: Icons.Rocket
      },
      {
        id: 'chart',
        label: 'Chart',
        iconComponent: Icons.LineChart
      },
      CustomSidePanel.defaultProps.panels[0],
      CustomSidePanel.defaultProps.panels[1]
    ]
  };
  return CustomSidePanel;
}

CustomSidePanelFactory.deps = SidePanelFactory.deps;
export default {CustomSidePanelFactory, CustomSidePanelsFactory};

