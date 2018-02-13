import superagent from 'superagent';
import WorldWind from '@nasaworldwind/worldwind';

class SentinelProductsStore {
    async load() {
        return superagent
            .get('http://eoapps.solenix.ch/stats/sentinel-2a/2017/10.json')
            .then(result => {
                return result.body.boxes.map(function (box) {
                    return new WorldWind.IntensityLocation((Number(box.bbox1Lat) + Number(box.bbox2Lat)) / 2, (Number(box.bbox1Lon) + Number(box.bbox2Lon)) / 2, box.amount);
                });
            });
    }
}

export default SentinelProductsStore;