$(document).ready(function() {
  var estados;
  var cidadesSelectFilter = $("#Cidade").first();
  var cidadesSelectForm = $("#Cidade-select")[0];

  function banner_responsivo() {
    if ($(window).width() < 992) {
      //Altera para o banner mobile
      $("header .banner").hide();
      $("header .banner-mobile").show();
    } else {
      //Altera para o banner desktop
      $("header .banner").show();
      $("header .banner-mobile").hide();
    }
  }

  //Troca de banner ao carregar a página
  banner_responsivo();

  $.getJSON("wp-content/themes/nissan/dist/state_city.json", function(data) {
    estados = data.estados;
  });

  //Troca de banner ao redimensionar a tela
  window.onresize = function() {
    banner_responsivo();
  };

  //Clique no botão de interesse que abre o formulário ou o aviso de em negociação ou vendido
  $(".interest").on("click", function() {
    var obj = new Object();
    obj.status = $(this).attr("data-status");
    obj.class = $(this).attr("data-class");

    var data = $.parseJSON($(this).attr("data-info"));

    $(".formInterest")
      .find(".name-concessionaria-text")
      .first()
      .text(data.nome_concessionaria);
    $(".formInterest")
      .find(".tel-concessionaria-text")
      .first()
      .text(data.telefone_concessionaria);
    $(".formInterest")
      .find(".endereco-concessionaria-text")
      .first()
      .text(data.endereco_concessionaria);

    $(".block-status")
      .find(".name-concessionaria-info")
      .first()
      .text(data.nome_concessionaria);
    $(".block-status")
      .find(".tel-concessionaria-info")
      .first()
      .text(data.telefone_concessionaria);
    $(".block-status")
      .find(".endereco-concessionaria-info")
      .first()
      .text(data.endereco_concessionaria);

    $(".formInterest")
      .find(".id-veiculo")
      .first()
      .val(data.id);
    $(".formInterest")
      .find(".email-concessionaria")
      .first()
      .val(data.email_concessionaria);
    $(".formInterest")
      .find(".name-concessionaria")
      .first()
      .val(data.nome_concessionaria);
    $(".formInterest")
      .find(".tel-concessionaria")
      .first()
      .val(data.telefone_concessionaria);
    $(".formInterest")
      .find(".endereco-concessionaria")
      .first()
      .val(data.endereco_concessionaria);
    $(".formInterest")
      .find(".modelo-carro")
      .first()
      .val(data.modelo);
    $(".formInterest")
      .find(".versao-carro")
      .first()
      .val(data.versao);
    $(".formInterest")
      .find(".cor-carro")
      .first()
      .val(data.cor);
    $(".formInterest")
      .find(".ano-carro")
      .first()
      .val(data.ano);
    $(".formInterest")
      .find(".preco-publicado")
      .first()
      .val(data.preco_publicado);
    $(".formInterest")
      .find(".desconto-total")
      .first()
      .val(data.desconto_total);
    $(".formInterest")
      .find(".outlet-nissan")
      .first()
      .val(data.outlet_nissan);
    $(".formInterest")
      .find(".image-src")
      .first()
      .val(data.image_src);

    if (obj.status == "ativo") {
      var html = $(".formInterest").html();
      var block_class = ".form-interest";
      $(".wpcf7-response-output").remove();
    } else {
      var html = $(".block-status").html();
      var block_class = ".notice";
    }

    $(".showcase .form-interest").remove();
    $(".showcase .notice").remove();
    $("." + obj.class).after(html);

    if (obj.status == "negociacao") {
      $(".notice .vendido").hide();
      $(".notice .negociacao").show();
    }

    if (obj.status == "vendido") {
      $(".notice h2").html("Vendido");
      $(".notice .negociacao").hide();
      $(".notice .vendido").show();
    }
    $(block_class).show();

    $("#Estado-select").on("change", function() {
      var estado = $(this)
        .find("option:selected")
        .first()
        .val();
      var cidades;

      var k = 0;
      while (k < estados.length) {
        if (estados[k].sigla === estado) {
          cidades = estados[k].cidades;
          break;
        }
        k++;
      }

      cidadesSelectForm.find("option").remove();

      for (var l = 0; l < cidades.length; l++) {
        var option = document.createElement("option");
        option.value = cidades[l];
        option.text = cidades[l];

        cidadesSelectForm.append(option);
      }
    });
  });

  //Abre o filtro mobile ao clicar em refina sua busca
  if ($(window).width() < 992) {
    $(".sidebar.filter .head").on("click", function() {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
        $(".sidebar.filter form").hide();
      } else {
        $(this).addClass("open");
        $(".sidebar.filter form").show();
      }
    });
  }

  //Cliques do footer
  function tab_footer(class_tab) {
    $("footer ." + class_tab).on("click", function() {
      if ($(this).hasClass("open")) {
        $("footer ." + class_tab + " li").hide();
        $(this).removeClass("open");
      } else {
        $("footer ." + class_tab + " li").show();
        $(this).addClass("open");
      }
      $("footer ." + class_tab + " li:first-child").show();
    });
  }
  if ($(window).width() < 767) {
    tab_footer("client");
    tab_footer("rede");
    tab_footer("nissan");
  }

  //Carrega estados e cidades
  $(document).on("change", "#Estado", function() {
    var estado = $(this)
      .find("option:selected")
      .first()
      .attr("data-estado");
    // var cidades;

    // var i = 0;
    // while (i < estados.length) {
    //   if (estados[i].sigla === estado) {
    //     cidades = estados[i].cidades;
    //     break;
    //   }
    //   i++;
    // }

    // cidadesSelectFilter.find("option").remove();

    // for (var j = 0; j < cidades.length; j++) {
    //   var option = document.createElement("option");
    //   option.value = cidades[j];
    //   option.text = cidades[j];

    //   cidadesSelectFilter.append(option);
    // }

    Array.prototype.slice
      .call(document.querySelector("select#Cidade").children)
      .forEach(function(opt) {
        if (opt.getAttribute("data-estado") == estado) {
          opt.style = "display: inline";
        } else {
          opt.style = "display: none";
        }
      });

    // $(document).find("#Cidade")
    //   .children("option.has-parent[data-estado='" + estado + "']")
    //   .each(function(opt) {
    //     opt.style("display: inline");
    //   });
  });

  $(document).on("change", "#Estado-select", function() {
    var estado = $(this)
      .find("option:selected")
      .first()
      .val();
    var cidades;

    var i = 0;
    while (i < estados.length) {
      if (estados[i].sigla === estado) {
        cidades = estados[i].cidades;
        break;
      }
      i++;
    }

    $(document)
      .find("#Cidade-select[name=cidade]")
      .empty();
    // cidadesSelectForm.find("option").remove();
    $(document)
      .find("#Cidade-select[name=cidade]")
      .append('<option value="">Selecione uma cidade</option>');
    for (var j = 0; j < cidades.length; j++) {
      var option = document.createElement("option");
      option.value = cidades[j];
      option.text = cidades[j];
      $(document)
        .find("#Cidade-select[name=cidade]")
        .append(option);
      // cidadesSelectForm.append(option);
    }
  });

  // $(document).on("submit", "input#send", function(event) {
  //   console.log(event);
  //   event.preventDefault();
  //   var res = confirm("Deseja enviar sua intenção de compra?");
  //   if(res === false) {
  //     window.location.href = "https://outletnissan.com.br";
  //   }
  // });
});
