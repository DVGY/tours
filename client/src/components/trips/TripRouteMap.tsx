import { Flex } from '@chakra-ui/react';
import { LatLngTuple } from 'leaflet';
import { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

type Position = LatLngTuple;

interface Point {
  type: 'Point';
  coordinates: Position;
}

export interface IStartLocation extends Point {
  address: string;
  description: string;
}
export interface ILocations extends IStartLocation {
  _id: string;
  day: number;
}
interface ITripRouteMapProps {
  startLocation: IStartLocation;
  locations: ILocations[];
}

const TripRouteMap: FC<ITripRouteMapProps> = ({ startLocation, locations }) => {
  const { coordinates: startCoordinates, description } = startLocation;
  const startCoordinate: LatLngTuple = [
    startCoordinates[1],
    startCoordinates[0],
  ];

  return (
    <Flex order={5}>
      <MapContainer
        center={startCoordinate}
        zoom={6}
        // zoomControl={false}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '300px', zIndex: 1 }}
        dragging={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={startCoordinate}>
          <Popup>Our Trip Starts here. {description}</Popup>
        </Marker>
        {locations.map(({ _id, coordinates, day, description }, index) => {
          const LatLongCoordinates: LatLngTuple = [
            coordinates[1],
            coordinates[0],
          ];

          return (
            <Marker position={LatLongCoordinates} key={_id}>
              <Popup>
                {index + 1} Stop. Day: {day}. {description}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Flex>
  );
};

export default TripRouteMap;
