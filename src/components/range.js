import React from 'react';
import ReactDOM from 'react-dom';

import {
	ReactiveBase,
	RangeSlider,
	SelectedFilters,
	ResultList,
    ReactiveList,
    RangeInput
} from '@appbaseio/reactivesearch';



const Main = (items) => (
    
	<ReactiveBase
		app="good-books-ds"
		url="https://xe6N9nDRV:51ea7a8a-6354-4b5f-83e1-12dce3b7ec47@arc-cluster-appbase-demo-ps1pgt.searchbase.io"
		enableAppbase
	>
		<div className="row">
			<div className="col">
				<RangeInput
					dataField="ratings_count"
					componentId="BookSensor"
					range={{
						start: 1000,
						end: 50000,
					}}
					rangeLabels={{
						start: '₹1000',
						end: '₹50000',
					}}
				/>
			</div>

			<div className="col">
				<ReactiveList
					componentId="SearchResult"
					dataField="original_title"
					from={0}
					size={3}
					className="result-list-container"
					pagination
					react={{
						and: 'BookSensor',
					}}
					render={({ data }) => (
						
								<ResultList>
							
							
								</ResultList>
						
					)}
				/>
			</div>
		</div>
	</ReactiveBase>
);

export default Main;
//ReactDOM.render(<Main />, document.getElementById('root'));
