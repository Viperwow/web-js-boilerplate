import uuidv4 from 'uuid/v4';
import {flow as _flow} from 'lodash';

export const generateUUID = () => uuidv4();

export const compose = (...functions) => Wrapped => _flow(...(functions.reverse()))(Wrapped);
