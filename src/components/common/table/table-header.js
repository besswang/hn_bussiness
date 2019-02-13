export default {
  name: 'ElTableHeader',
  render(h) {
    return (
      <table>
        <thead>
            <tr>
              <th>展示图</th>
              <th>商品名称</th>
            </tr>
        </thead>
      </table>
    );
  },
  props: {
      data(){
        
      }
  }
};