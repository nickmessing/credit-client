import { computed, defineComponent } from 'vue'
import { RouteLocationRaw, RouterLink } from 'vue-router'
import { typedArray, typedFunction, typedListener, typedObject } from '@/types'
import { Pagination, Search } from '@/generated/graphql'
import { CButton } from '../form'
import { Icon } from './Icon'

export type TableHeader<RowType extends Record<string, unknown>> =
  | {
      [K in keyof RowType]: {
        label: string
        sortable?: boolean // default true
        searchable?: boolean // default false
        key: K
        transform?: (data: RowType[K]) => string
      }
    }[keyof RowType]
  | {
      label: string
      sortable?: false
      searchable?: false
      key: 'actions'
      transform?: undefined
    }

export const Table = <RowType extends Record<string, unknown>>() =>
  defineComponent({
    name: 'Table',
    props: {
      headers: {
        type: typedArray<TableHeader<RowType>>(),
        required: true,
      },
      data: {
        type: typedArray<RowType>(),
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      pagination: {
        type: typedObject<Pagination>(),
        default: (): Pagination => ({
          offset: 0,
          limit: 10,
          orderBy: null,
          orderDesc: null,
        }),
      },
      onPaginationChange: {
        type: typedListener<[pagination: Pagination]>(),
        required: false,
      },
      search: {
        type: typedObject<Search>(),
        default: (): Search => ({
          field: null,
          needle: '',
        }),
      },
      onSearchChange: {
        type: typedListener<[search: Search]>(),
        required: false,
      },
      linkFn: {
        type: typedFunction<(row: RowType) => RouteLocationRaw>(),
        required: false,
      },
      actionsRenderer: {
        type: typedFunction<(row: RowType) => JSX.Element>(),
        required: false,
      },
    },
    setup(props) {
      const setOrderBy = (orderBy: string | null) => {
        const orderDesc =
          orderBy === null
            ? null
            : orderBy !== props.pagination.orderBy
            ? false
            : props.pagination.orderDesc === false
            ? true
            : props.pagination.orderDesc === true
            ? null
            : false
        props.onPaginationChange?.({
          ...props.pagination,
          orderBy,
          orderDesc,
        })
      }
      const setOrderDesc = (orderDesc: null | boolean) => {
        props.onPaginationChange?.({
          ...props.pagination,
          orderDesc,
        })
      }
      const setSearchField = (field: string | null) => {
        props.onSearchChange?.({
          ...props.search,
          field,
          needle: '',
        })
      }
      const setSearchNeedle = (needle: string) => {
        props.onSearchChange?.({
          ...props.search,
          needle,
        })
      }

      const onOrderByChange = (event: Event) => {
        setOrderBy(
          (event.target as HTMLSelectElement).value === 'null' ? null : (event.target as HTMLSelectElement).value,
        )
      }
      const onOrderDescChange = (event: Event) => {
        setOrderDesc(
          (event.target as HTMLSelectElement).value === 'null'
            ? null
            : (event.target as HTMLSelectElement).value === 'desc',
        )
      }

      const onSearchByChange = (event: Event) => {
        setSearchField(
          (event.target as HTMLSelectElement).value === 'null' ? null : (event.target as HTMLSelectElement).value,
        )
      }
      const onSearchNeedleChange = (event: Event) => {
        props.onPaginationChange?.({
          ...props.pagination,
          offset: 0,
        })
        setSearchNeedle((event.target as HTMLInputElement).value)
      }

      const page = computed(() => Math.round(props.pagination.offset / props.pagination.limit) + 1)
      const totalPages = computed(() => Math.ceil(props.total / props.pagination.limit))

      return () => (
        <table class="bg-white block shadow rounded p-2 mb-2">
          <thead class="block">
            <tr class="block">
              <th class="block">
                <CButton class="w-full block mb-2" to="/users/new">
                  Adaugă
                  <Icon name="mdiAccountPlus" class="ml-2" />
                </CButton>
              </th>
              <th class="block">
                <div class="flex flex-wrap p-2 mb-2 rounded border border-gray-500">
                  <div class="w-full">Sortare:</div>
                  <div class="w-6/12 pr-2">
                    <select class="bg-white rounded shadow h-8 w-full" onChange={onOrderByChange}>
                      <option value="null">Sortează după:</option>
                      {props.headers
                        .filter(header => header.key !== 'actions' && header.sortable !== false)
                        .map(header => (
                          <option value={String(header.key)} selected={header.key === props.pagination.orderBy}>
                            {header.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div class="w-6/12 pl-2">
                    <select class="bg-white rounded shadow h-8 w-full" onChange={onOrderDescChange}>
                      <option value="null" selected={props.pagination.orderDesc == null}>
                        ---
                      </option>
                      <option value="asc" selected={props.pagination.orderDesc === false}>
                        Crescător
                      </option>
                      <option value="desc" selected={props.pagination.orderDesc === true}>
                        Descrescător
                      </option>
                    </select>
                  </div>
                </div>
              </th>
              <th class="block">
                <div class="flex flex-wrap p-2 mb-2 rounded border border-gray-500">
                  <div class="w-full">Căutare:</div>
                  <div class="w-6/12 pr-2">
                    <select class="bg-white rounded shadow h-8 w-full" onChange={onSearchByChange}>
                      <option value="null">Caută în:</option>
                      {props.headers
                        .filter(header => header.searchable === true)
                        .map(header => (
                          <option value={String(header.key)} selected={header.key === props.search.field}>
                            {header.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div class="w-6/12 pl-2">
                    <input
                      class="bg-white rounded shadow h-8 w-full px-2"
                      onInput={onSearchNeedleChange}
                      value={props.search.needle}
                      placeholder="căutare"
                      disabled={props.search.field == null}
                    />
                  </div>
                </div>
              </th>
              <th class="block">
                <div class="p-2 rounded border border-gray-500">
                  <div class="block">
                    Pagina {page.value}/{totalPages.value}
                  </div>
                  <div class="flex">
                    <div class="w-6/12 pr-1">
                      <CButton
                        class="w-full"
                        disabled={page.value === 1}
                        onClick={() => {
                          if (page.value === 1) {
                            return
                          }
                          props.onPaginationChange?.({
                            ...props.pagination,
                            offset: props.pagination.offset - props.pagination.limit,
                          })
                        }}
                      >
                        <Icon name="mdiArrowLeft" />
                        Precedenta
                      </CButton>
                    </div>
                    <div class="w-6/12 pl-1">
                      <CButton
                        class="w-full"
                        disabled={page.value === totalPages.value}
                        onClick={() => {
                          if (page.value === totalPages.value) {
                            return
                          }
                          props.onPaginationChange?.({
                            ...props.pagination,
                            offset: props.pagination.offset + props.pagination.limit,
                          })
                        }}
                      >
                        Urmatoarea
                        <Icon name="mdiArrowRight" />
                      </CButton>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="block">
            {props.data.map(row => (
              <tr class="block border border-gray-200 rounded p-2 mt-2">
                {props.headers.map(header => {
                  const content = (
                    <div>
                      <span class="font-bold">{header.label}: </span>
                      <span>
                        {header.key === 'actions'
                          ? 'Actions here'
                          : header.transform?.(row[header.key]) ?? row[header.key]}
                      </span>
                    </div>
                  )
                  const link = props.linkFn?.(row)
                  return <td class="block">{link ? <RouterLink to={link}>{content}</RouterLink> : content}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )
    },
  })
