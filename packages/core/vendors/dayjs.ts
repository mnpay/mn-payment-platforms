import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import arraySupport from 'dayjs/plugin/arraySupport'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import minMax from 'dayjs/plugin/minMax'
import objectSupport from 'dayjs/plugin/objectSupport'
import relativeTime from 'dayjs/plugin/relativeTime'
import toArray from 'dayjs/plugin/toArray'
import toObject from 'dayjs/plugin/toObject'
import utc from 'dayjs/plugin/utc'

dayjs.extend(advancedFormat)
dayjs.extend(arraySupport)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(minMax)
dayjs.extend(objectSupport)
dayjs.extend(relativeTime)
dayjs.extend(toArray)
dayjs.extend(toObject)
dayjs.extend(utc)

export { dayjs }
