module ApplicationHelper
  def side_menu_links(path, icon_class, label)
    content_tag(:li) do
      link_to path, class: 'block px-4 py-2 hover:rounded hover:bg-gray-700' do
        concat content_tag(:i, '', class: "fa-solid #{icon_class} mr-2")
        concat content_tag(:span, label, class: 'hidden md:inline-block')
      end
    end
  end
end
