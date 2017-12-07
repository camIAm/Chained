import {compose, join, slice, split} from 'ramda'
// be careful with this method. Temporary solution only
export const userify = fullUser => compose(join(' '), slice(1, Infinity), split('_'))(fullUser)