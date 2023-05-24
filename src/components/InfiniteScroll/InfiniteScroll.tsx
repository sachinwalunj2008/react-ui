import React, { useEffect, useCallback, useRef, RefObject } from 'react'
import { ListLoading, BackToTop } from '../../module'
import ConditionalWrapper from '../ConditionalWrapper/ConditionalWrapper'

/**
 * @deprecated Please use tables to handle infinite loading
 **/
const InfiniteScroll = ({
  callout,
  loadingLazy,
  children,
  longList,
  noLoader,
  listLength,
  count,
  noBackToTop,
  goToTop,
  feedOffset,
  useTable,
  loadingContainerHeight = '160px',
  onLastPage,
}: InfiniteScrollProps): JSX.Element => {
  const $list = useRef<HTMLTableSectionElement | HTMLDivElement>(null)
  const endOfFeed =
    count !== null && (onLastPage || Number(count) === Number(listLength))

  const loadMore = useCallback(
    (entries) => {
      const target = entries[0]
      if (target.isIntersecting && !endOfFeed) {
        !loadingLazy && callout()
      }
    },
    [loadingLazy, endOfFeed, callout]
  )

  useEffect(() => {
    const options = {
      root: null, // window by default
      rootMargin: feedOffset || '0px',
      threshold: 0.25,
    }
    const isRefMounted = $list.current

    // Create observer
    const observer = new IntersectionObserver(loadMore, options)

    // observer the loader
    if (isRefMounted) {
      observer.observe(isRefMounted)
    }

    // clean up on willUnMount
    return () => {
      if (isRefMounted) {
        observer.unobserve(isRefMounted)
      }
    }
  }, [loadMore, feedOffset])

  const loadingStyle = { height: !endOfFeed ? loadingContainerHeight : '0px' }

  return (
    <React.Fragment>
      {/* The actual list is the children */}
      {children}
      {/* The list loader - for table, needs table elements  */}
      <ConditionalWrapper
        condition={true}
        wrapper={(children) =>
          useTable ? (
            <tfoot ref={$list as RefObject<HTMLTableSectionElement>}>
              <tr className='custom-header'>
                <td
                  colSpan={100}
                  className={loadingLazy && !noLoader ? '' : 'p-0'}
                >
                  {children}
                </td>
              </tr>
            </tfoot>
          ) : (
            <div style={loadingStyle} ref={$list}>
              {children}
            </div>
          )
        }
      >
        {loadingLazy && !noLoader && (
          <ListLoading
            longList={longList}
            numberOfRows={longList ? 20 : undefined}
          />
        )}
      </ConditionalWrapper>
      {/* Show BackToTop component - for table, needs table elements */}
      {!loadingLazy &&
        !noBackToTop &&
        listLength !== undefined &&
        listLength > 0 &&
        endOfFeed && (
          <ConditionalWrapper
            condition={useTable && listLength >= 30}
            wrapper={(children) => (
              <tfoot>
                <tr style={{ border: 0 }}>
                  <td colSpan={100}>{children}</td>
                </tr>
              </tfoot>
            )}
          >
            <BackToTop listLength={listLength} goTo={goToTop} />
          </ConditionalWrapper>
        )}
    </React.Fragment>
  )
}

export default InfiniteScroll

//******** MAKE SURE TO GIVE THE INFINITESCROLL COMPONENT A KEY attribute key={_name_} ESPECIALLY IF MORE THAN 1 INFINITESCROLL IS USED IN THE SAME PAGE **********//

type InfiniteScrollProps = {
  callout: () => void
  loadingLazy?: boolean
  children?: React.ReactNode
  longList?: boolean
  noLoader?: boolean
  listLength?: number
  count?: string | number
  noBackToTop?: boolean
  goToTop?: string
  feedOffset?: string
  onLastPage?: boolean
  useTable?: boolean
  loadingContainerHeight?: string
}
