import math
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'items_per_page'
    max_page_size = 100

    def get_page_size(self, request):
        
        items_per_page = request.query_params.get('items_per_page')
        
        if items_per_page:
            try:
                return min(int(items_per_page), self.max_page_size)
            except (ValueError, TypeError):
                return self.page_size
        
        return self.page_size

    def get_paginated_response(self, data):
        
        page_size = self.get_page_size(self.request)

        last_page = math.ceil( self.page.paginator.count/page_size)
        if self.page.has_previous():
            previous_page = self.page.previous_page_number() 
        else:
            previous_page = None

        if self.page.has_next():
            next_page = self.page.next_page_number() 
        else:
            next_page = None

        paginador = [
            {
                    "label": "&laquo; Previous",
                    "page": previous_page
            }
        ]

        for pagina in range(1, last_page + 1):
            paginador.append({"label": pagina, "page": pagina})

        paginador.append(
            {
                    "label": "Next &raquo;",
                    "page": next_page
            }
        )


        return Response({
            'data': data,
            "payload": {
            "pagination": {
                "page": self.page.number,
                "from": 1,
                "last_page": last_page,
                "links": paginador,
        }
    }
        })
